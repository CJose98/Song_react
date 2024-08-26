import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"
import { useLocation } from "react-router-dom";

export default function CreateSongGenero() {
    //Obtener Datos
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/songs/");
    const [idSong, setIdSong] = useState();
    const [selectedSongs, setSelectedSongs] = useState([]);

    const [triggerFetch, setTriggerFetch] = useState(false);
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token
    const location = useLocation();
    const { id_genero } = location.state || {};


    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = { song: idSong, genre: id_genero };
    const mapped = Object.keys(updateData).map(key => { return `${key}: ${updateData[key]}` })
    //console.log("MAPEO: ", mapped);


    const [{ data, isError, isLoading }, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        }
    );
    const [{ dataF, isErrorF, isLoadingF }, doFetchF] = useFetch(
        'https://sandbox.academiadevelopers.com/harmonyhub/song-genres/',
        {
            method: 'POST',
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
    if (isError) return <p>Error al cargar las musicas, recarga la pagina</p>
    if (songs.length === 0) return <p>No hay musica disponibles</p>



    //----------CREAR DATOS DEL GENERO------------------------------------------------------------------------------------->

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
        const isConfirmed = window.confirm('¿Estás seguro de que deseas crear los datos?');

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
                    <h1>Create Song-Genero</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo" />
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
                        <button type="submit" className="btn">Create</button>
                        {console.log("song: ", idSong, "genre :",id_genero)}
                        {isLoadingF && triggerFetch && (<p>Cargando...</p>)}
                        {isErrorF && <p>Error al crear Song genero.</p>}
                        {dataF && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}