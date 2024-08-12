import React from "react";
import useFetch from "../../hooks/useFetch_Auth";
import "../../styles/css/artista_create.css"
import { useParams} from "react-router-dom";
import { useState } from "react";

export default function UpdateMusica(){
    const {id} = useParams();
    const [triggerFetch, setTriggerFetch] = useState(false);//verificacion
    const [artData, setArtData] = useState({ title: "", year: "", album:""});
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

    console.log("Update genero: ", id)
    //VERIFICAR SI SE AGREGA TODOS LOS DATOS
    let updateData = {title: artData.title.trim()}; //prioridad
    // Solo incluir bio si no esta vacio
    if (artData.year) {updateData = {...updateData, description: artData.year}} 
    // Solo incluir bio si no esta vacio
    if (artData.album) {updateData = {...updateData, description: artData.album}} 

    const mapped = Object.keys(updateData).map(key => {return `${key}: ${updateData[key]}`})
    console.log("MAPEO: ", mapped);


    const [{data, isError, isLoading}, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
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
                    <h1>Update Musica</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="input-box">
                        <input type="text" id="username" name="title" placeholder="Title-priority" required
                            value={artData.title}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="year" placeholder="Year"
                            value={artData.year}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="input-box">
                        <input type="number" id="username" name="album" placeholder="Album"
                            value={artData.album}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="register-link">
                        <button type="submit" className="btn">Update</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al modificar la musica.</p>}
                        {data && (<p>enviado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
}