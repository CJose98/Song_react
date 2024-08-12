import React, { useState } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"

export default function CreateSongArtista(){
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [artData, setArtData] = useState({ role: "", song: "", artist: "" });
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = {role: artData.role.trim(), song: artData.song.trim(), artist: artData.artist.trim()};  
    
    const mapped = Object.keys(updateData).map(key => {return `${key}: ${updateData[key]}`})
    console.log("MAPEO: ", mapped);


    const [{data, isError, isLoading}, doFetch] = useFetch(
        'https://sandbox.academiadevelopers.com/harmonyhub/song-artists/',
        {
            method: 'POST',
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
                    <h1>Create Song-Artista</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="role" placeholder="Role-priority" required
                            value={artData.role}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="song" placeholder="Id song" required
                            value={artData.song}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="artist" placeholder="Id artist"  required
                            value={artData.artist}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="register-link">
                        <button type="submit" className="btn">Create</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al crear Song Artista.</p>}
                        {data && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}