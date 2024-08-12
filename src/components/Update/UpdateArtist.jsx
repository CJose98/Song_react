import React from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"
import { useParams} from "react-router-dom";
import { useState } from "react";

export default function UpdateArtist(){
    const {id} = useParams();
    const [triggerFetch, setTriggerFetch] = useState(false);//verificacion
    const [artData, setArtData] = useState({ name: "", bio: "", website: "" });

    //Obtener el token guardado.
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

     // Función para asegurarse de que la URL tenga un esquema adecuado
     const formatURL = (url) => {
        // Quitar espacios y agregar el protocolo si falta
        const trimmedUrl = url.trim();
        if (artData.website){
            if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
                return `http://${trimmedUrl}`;
           }
           return trimmedUrl;
        }
    };

    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = {name: artData.name.trim()}; //prioridad
    // Solo incluir bio si no esta vacio
    if (artData.bio) {updateData = {...updateData, bio:artData.bio.trim()}} 
    // Solo incluir website si formatURL(artData.website) no es null
    const formattedWebsite = formatURL(artData.website);
    if (formattedWebsite) {updateData = {...updateData, website:formattedWebsite}}
    
    const mapped = Object.keys(updateData).map(key => {return `${key}: ${updateData[key]}`})
    console.log("MAPEO: ", mapped);


    const [{data, isError, isLoading}, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}`,
        {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                    },
            body: JSON.stringify(updateData), 
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
                    <h1>Artista</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="name" placeholder="Name-priority" required
                            value={artData.name}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="bio" placeholder="Biografia"
                            value={artData.bio}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="website" placeholder="Website"
                            value={artData.website}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="register-link">
                        <button type="submit" className="btn">Update</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al modificar el artista.</p>}
                        {data && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}