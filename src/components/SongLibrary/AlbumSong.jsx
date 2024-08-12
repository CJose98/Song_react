import "../../styles/css/artista_song.css"
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth"
import { useNavigate } from "react-router-dom";
import SongList_Album from "../MusicPlayer/SongList_Album";

export default function AlbumsSong({album}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")

    const[{data, isError, isLoading}, doFetch] = useFetch(
        `http://sandbox.academiadevelopers.com/harmonyhub/songs/`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
        }
    );

    useEffect(()=>{
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar las canciones</p>
    if (!data) return <p>No hay canciones disponibles</p>

     //1* Filtramos las "Song Artist List" del artista seleccionado.
    const albumSongs = data.results.filter((song)=> String(song.album) === String(album.id));
    const id_song = albumSongs.length > 0 ? albumSongs[0].song : null;

    //Envio de datos para crear artista
    const handleClickModificar =(subId)=>{
        navigate(`/album-update/${subId}`)
    }

    const handleClickEliminar =(subId_e, name_e)=>{
        navigate(`/album-eliminar/${subId_e}`, {state:{album_eliminar: name_e}})
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
                                src={album.cover ? album.cover : "/img/concentracion/beats to think.jpg"}
                                alt= 'Artista'
                                onError={(e) => { e.target.src = "/img/concentracion/beats to think.jpg"; }} // Manejo de errores de carga
                            />
                        </div>
                        <div className="playlist-info">
                            <div className="playlist-title">{album.title}</div>
                           {/* <div style={{ height: '10px' }}></div> */}
                            <div className="playlist-stats">
                                <div className="song-name">Album</div>
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
                                {/* ELIMINAR ALBUM */}
                                <button className="modific" onClick={()=> handleClickEliminar(album.id, album.title)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/eliminar.png" id="imghh"/>
                                    </div>
                                </button>
                            </div>
                            <div className="playlist-buttons-three-dot">
                                {/* MODIFICAR ALBUM */}
                                <button className="modific" onClick={()=> handleClickModificar(album.id)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/modificar.png" id="imghh"/>
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
                    {console.log("id para modificar el album: ",album.id," id_song modifica una musica: ", id_song)}
                    {isLoading && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar las musicas de album</p>}
                    {id_song? <SongList_Album id_song={id_song}/> : <p>No hay musica de album disponible</p>}

                </div>
            </div>
        </>
    );
}