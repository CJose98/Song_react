import "../../../styles/css/artista_song.css"
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch_Auth"
import { useParams } from "react-router-dom";
import AlbumsSong from "../AlbumSong";

export default function IdHalbum() {
    const {id} = useParams();
    const token = localStorage.getItem("AuthToken")

    const[{data, isError, isLoading}, doFetch] = useFetch(
        `http://sandbox.academiadevelopers.com/harmonyhub/albums/${id}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
        }
    );

    useEffect(()=>{
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar el Id_genero</p>
    if (!data) return <p>Id no disponibles</p>
                 
    return (
        <div className="container_artista_song">
            {/*CANCIONES*/}
            {isLoading && (<p>Cargando...</p>)}
            {isError && <p>Error al el Id_album...</p>}
            {data ? <AlbumsSong  album={data}/> : <p>No hay album disponible...</p>}
        </div>
    );
}