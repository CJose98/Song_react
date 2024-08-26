import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"
import { useParams, useLocation } from "react-router-dom";

export default function UpdateSongArtista() {

    //Obtener Datos
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/songs/");
    const [idSong, setIdSong] = useState();
    const [selectedSongs, setSelectedSongs] = useState([]);

    const [artData, setArtData] = useState({ role: "", song: "", artist: "" });
    const { id } = useParams();
    const location = useLocation();
    const { id_artista } = location.state || {};
    const [triggerFetch, setTriggerFetch] = useState(false);//verificacion
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token


    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = { role: artData.role.trim(), song: idSong, artist: id_artista };
    const mapped = Object.keys(updateData).map(key => {
        return `${key}: ${updateData[key]}`
    })
    //console.log("MAPEO: ", mapped);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        }
    );
    const [{ dataF, isErrorF, isLoadingF }, doFetchF] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-artists/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(updateData),
        }
    );

    //----------OBTENER DATOS MUSICAL------------------------------------------------------------------------------------->

    function ensureHttps(url) {
        if (url.startsWith("http://")) {
            url = "https://" + url.slice(7);
        }
        return url;
    }
    useEffect(() => {
        if (data) {
            setSongs(prevArtists => [...prevArtists, ...data.results]);
            if (data.next) {
                setNextUrl(ensureHttps(data.next));
            }
        }
    }, [data])

    useEffect(() => {
        //si la url no es nula ejecuta doFetch
        if (nextUrl) {
            doFetch(nextUrl,
                { //OPTIONS
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
                }
            ); //cuanfo la url cambia hace una nueva peticion a la paginna siguiente(siempre q exista)
        }
    }, [nextUrl]);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar los artistas, recarga la pagina</p>
    if (songs.length === 0) return <p>No hay artista disponibles</p>

    //----------CREAR DATOS DEL GENERO------------------------------------------------------------------------------------->

    const handleInputChange = (event) => {
        setArtData({
            ...artData,
            [event.target.name]: event.target.value,
        })
    }

    // Modificacion constante, cada ves que hago clic en el boton
    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedCategories = songs.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );

        //seleciona al artista en pantalla / console.log("Artista seleccionada", updatedSelectedCategories)
        setSelectedSongs(updatedSelectedCategories);

        //Obtenemos el id del dato a crear
        updatedSelectedCategories.map((id_a) => (
            setIdSong(id_a.id)
        ));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const isConfirmed = window.confirm('¿Estás seguro de que deseas modificar los datos?');

        if (isConfirmed) {
            alert('¡Has hecho clic en confirmar!');
            // Enviamos los datos
            setTriggerFetch(true);
            doFetchF()

        } else {
            alert('Operación cancelada');
        }
    }


    return (
        <div className="container_create_artista">
            <div className="formulario_art">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h1>Update Song-Artista</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo" />
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="role" placeholder="Rol-requerido" required
                            value={artData.role}
                            onChange={handleInputChange} />
                    </div>

                    <h2>Cancion</h2>
                    <div className="input-box-select">
                        <select multiple size={3} value={selectedSongs.map((cat)=> cat.id)} onChange={handleCategoryChange} required
                        >
                            {songs.map((category)=>(
                                <option key={category.id} value={category.id}>
                                        {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="register-link">
                        <button type="submit" className="btn">Update</button>
                        {console.log("role: ", artData.role, " song: ", idSong, " artista :",id_artista)}
                        {isLoadingF && triggerFetch && (<p>Cargando...</p>)}
                        {isErrorF && <p>Error al modificar la musica del Artista.</p>}
                        {dataF && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}