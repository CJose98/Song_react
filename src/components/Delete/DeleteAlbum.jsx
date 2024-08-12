import "../../styles/css/artista_create.css"
import {useState } from "react";
import useFetch from "../../hooks/useFetch_Auth"
import { useLocation, useParams } from "react-router-dom";

export default function DeleteAlbum() {
    const {id} = useParams();
    const location = useLocation();
    const {album_eliminar} = location.state || {};
    const [triggerFetch, setTriggerFetch] = useState(false);//verificacion

    const token = localStorage.getItem("AuthToken")

    console.log("id ", id)
    const[{data, isError, isLoading}, doFetch] = useFetch(
        `http://sandbox.academiadevelopers.com/harmonyhub/albums/${id}`,
        {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
        }
    );

    const handleSubmit=(event)=>{
        event.preventDefault();
        setTriggerFetch(true);
        doFetch()
        }

    return(
        <div className="container_create_artista">
            <div className="formulario_art">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h1>Delete Album</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                        
                        <div>
                            <h2 style={{ 
                                color: 'black',
                                background: 'rgb(18,10,10)',
                                background: 'linear-gradient(90deg, rgba(18,10,10,1) 0%, rgba(89,185,83,0.9051995798319328) 0%)',
                                borderRadius: '1rem',
                                margin:'2rem'
                            }}>
                                {album_eliminar}
                            </h2>    
                        </div>
                    </div>

                    <div className="register-link">
                        <button type="submit" className="btn">Delete</button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        {isError && <p>Error al eliminar rl Album.</p>}
                        {data && (<p>eliminado</p>)}
                    </div>
                </form>
            </div>
        </div>
    );

}