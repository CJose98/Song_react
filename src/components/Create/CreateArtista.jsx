import React, { useState } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"

export default function CreateArtista(){
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [artData, setArtData] = useState({ name: "", bio: "", website: "" });

    //Obtener el token guardado.
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

    // Función para asegurarse de que la URL tenga un esquema adecuado
    const formatURL = (url) => {
        // Quitar espacios y agregar el protocolo si falta
        const trimmedUrl = url.trim();
        if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
             return `http://${trimmedUrl}`;
        }
        return trimmedUrl;
    };


    const [{data, isError, isLoading}, doFetch] = useFetch(
        'https://sandbox.academiadevelopers.com/harmonyhub/artists/',
        {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                    },
            body: JSON.stringify({
                name: artData.name.trim(),
                bio: artData.bio.trim() || null,
                website: formatURL(artData.website) || null
            }), 
        }
    );

    const handleInputChange = (event) =>{
        setArtData({
            ...artData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setTriggerFetch(true);
        doFetch()
        }
   
    return(
        <div className="container_create_artista">
            <div className="formulario_art">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h1>Crear Artista</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="name" placeholder="Name" required
                            value={artData.name}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="bio" placeholder="Biografia" required
                            value={artData.bio}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="website" placeholder="Website" required
                            value={artData.website}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="register-link">
                        <button type="submit" className="btn">Create</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al cargar los datos.</p>}
                        {data && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}