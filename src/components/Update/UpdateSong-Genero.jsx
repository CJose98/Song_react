import React from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"
import { useParams} from "react-router-dom";
import { useState } from "react";

export default function UpdateSongGenero(){
    const {id} = useParams();
    const [triggerFetch, setTriggerFetch] = useState(false);//verificacion
    const [artData, setArtData] = useState({ song: "", genre: ""});
    const token = localStorage.getItem("AuthToken")
    
    console.log("Modificar Song-Genero: ", id)
    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = {song: artData.song.trim(), genre: artData.genre.trim()};  

    const mapped = Object.keys(updateData).map(key => {
        return `${key}: ${updateData[key]}`
    })
    console.log("MAPEO: ", mapped);
        

    const [{data, isError, isLoading}, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-genres/${id}`,
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
                    <h1>Update Song-Genero</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="song" placeholder="Id Song-priority" required
                            value={artData.song}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="genre" placeholder="Id Genre-priority" 
                            value={artData.genre}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="register-link">
                        <button type="submit" className="btn">Update</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al modificar la Song-Genero</p>}
                        {data && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}