import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"

export default function CreateMusica() {
    //Obtener Datos
    const [albums, setAlbums] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/albums/");
    const [idAlbum, setIdAlbum] = useState();
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [artData, setArtData] = useState({ title: "", year: ""});

    const [triggerFetch, setTriggerFetch] = useState(false);
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = { title: artData.title.trim() };
    if (artData.year) { updateData = { ...updateData, year: artData.year.trim() } }
    if (idAlbum) { updateData = { ...updateData, album: idAlbum } }

    //const mapped = Object.keys(updateData).map(key => { return `${key}: ${updateData[key]}` })
    //console.log("MAPEO: ", mapped);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        }
    );
    const [{ dataF, isErrorF, isLoadingF }, doFetchF] = useFetch(
        'https://sandbox.academiadevelopers.com/harmonyhub/songs/',
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
        setAlbums(prevArtists => [...prevArtists, ...data.results]);
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
if (isError) return <p>Error al cargar los albunes, recarga la pagina</p>
if (albums.length === 0) return <p>No hay albunes disponibles</p>



//----------CREAR DATOS DEL ALBUM------------------------------------------------------------------------------------->

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
    const updatedSelectedCategories = albums.filter((cat) =>
        selectedOptions.includes(String(cat.id))
    );

    //seleciona al artista en pantalla / console.log("Artista seleccionada", updatedSelectedCategories)
    setSelectedAlbums(updatedSelectedCategories);

    //Obtenemos el id del dato a crear
    updatedSelectedCategories.map((id_a) => (
        setIdAlbum(id_a.id)
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
                    <h1>Create Musica</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo" />
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="title" placeholder="Titulo-requerido" required
                            value={artData.title}
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="year" placeholder="Año"
                            value={artData.year}
                            onChange={handleInputChange} />
                    </div>
                    <h2>Album</h2>
                    <div className="input-box-select">
                        <select multiple size={3} value={selectedAlbums.map((cat)=> cat.id)} onChange={handleCategoryChange}
                        >
                            {albums.map((category)=>(
                                <option key={category.id} value={category.id}>
                                        {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="register-link">
                        <button type="submit" className="btn">Create</button>
                        {console.log("title: ", artData.title," year :",artData.year," albums: ", idAlbum)}
                        {isLoadingF && triggerFetch && (<p>Cargando...</p>)}
                        {isErrorF && <p>Error al crear la musica.</p>}
                        {dataF && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}