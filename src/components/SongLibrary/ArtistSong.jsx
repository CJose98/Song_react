import "../../styles/css/artista_song.css"
import { useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch_Auth"
import { useNavigate } from "react-router-dom";
import SongList_Artista from "../MusicPlayer/SongList_Artista";

export default function ArtistSong({artista}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")
     //Obtener Datos
     const [songs, setSongs] = useState([]);
     const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/song-artists/");

    const[{data, isError, isLoading}, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
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


    //1* Filtramos las "Song Artist List" del artista seleccionado.
    const artistSongs = songs.filter((artista_song)=> String(artista_song.artist) === String(artista.id));
    const id_song = artistSongs.length > 0 ? artistSongs[0].song : null;
    //console.log("song-artista: ",artistSongs[0])

    //Envio de datos para crear artista
    const handleClick =(subId)=>{
        navigate(`/artista-update/${subId}`)
    }
    const handleClickEliminar =(subId_e, name_e)=>{
        navigate(`/eliminar-artista/${subId_e}`, {state:{art_eliminar: name_e}})
    }
    const handleClickCrear =(subId_e)=>{
        console.log("id**: ",subId_e)
        navigate(`/song-artista-create`, {state:{id_artista: subId_e}})
    }
                 
    return (
        <>
            <div className="right">
                {/*CABEZA*/}
                <div className="playlist-header">
                    <div className="playlist-content">
                        <div className="playlist-cover">
                            <img 
                                id="imgp" 
                                src={artista.image ? artista.image : "/img/concentracion/beats to think.jpg"}
                                alt= 'Artista'
                                onError={(e) => { e.target.src = "/img/concentracion/beats to think.jpg"; }} // Manejo de errores de carga
                            />
                        </div>
                        <div className="playlist-info">
                            <div className="playlist-title">{artista.name}</div>
                           {/* <div style={{ height: '10px' }}></div> */}
                            <div className="playlist-stats">
                                <div className="song-name">{artista.bio}</div>
                                <span>25.734.892 oyentes mensuales</span>
                            </div>
                        </div> 
                    </div>
                </div>
                
                <div className="playlist-songs-container">
                    {/*BOTONES */}
                    <div className="playlist-buttons">
                        <div className="playlist-buttons-left">
                            <div className="playlist-buttons-resume-pause">
                                <img src="/img/asset/Pause.svg" alt=""/>
                            </div>
                            <div className="playlist-buttons-like">
                                <img src="/img/asset/FiiledLike.svg" alt="" className="spotify-color"/>
                            </div>
                            <div className="playlist-buttons-download">
                                {/* ELIMINAR ARTISTA */}
                                <button className="modific" onClick={()=> handleClickEliminar(artista.id, artista.name)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/eliminar.png" id="imghh"/>
                                    </div>
                                </button>
                            </div>
                            <div className="playlist-buttons-three-dot">
                                {/* MODIFICAR ARTISTA  */}
                                <button className="modific" onClick={()=> handleClick(artista.id)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/modificar.png" id="imghh"/>
                                    </div>
                                </button>
                            </div>
                            <div className="playlist-buttons-three-dot">
                                {/* CREAR MUSICA-ART */}
                                <button className="modific" onClick={()=> handleClickCrear(artista.id)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/crear.png" id="imghh"/>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="playlist-buttons-right">
                            <div className="playlist-buttons-search">
                                    <img src="/img/asset/Search.svg" alt=""/>
                            </div>
                            <div className="playlist-buttons-order">
                                Custom Order
                            </div>
                        </div>
                    </div>

                    {/*CANCIONES*/}
                    {console.log("Artista Id: ",artista.id," Id musical de artista: ", id_song)}
                    {isLoading && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {id_song ? <SongList_Artista id_art={artista.id} id_song={id_song}/> : <p>No hay canciones disponibles</p>}

                </div>
            </div>
        </>
    );
}