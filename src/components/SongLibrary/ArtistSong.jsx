import "../../styles/css/artista_song.css"
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth"
import { useNavigate } from "react-router-dom";
import SongList_Artista from "../MusicPlayer/SongList_Artista";

export default function ArtistSong({artista}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")

    console.log("id artista: ", artista.id)
    const[{data, isError, isLoading}, doFetch] = useFetch(
        "http://sandbox.academiadevelopers.com/harmonyhub/song-artists/",
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
    const artistSongs = data.results.filter((artista_song)=> String(artista_song.artist) === String(artista.id));
    console.log("id artista: ", artistSongs)
    const id_song = artistSongs.length > 0 ? artistSongs[0].song : null;

    //Envio de datos para crear artista
    const handleClick =(subId)=>{
        navigate(`/artista-update/${subId}`)
    }
    const handleClickEliminar =(subId_e, name_e)=>{
        navigate(`/eliminar-artista/${subId_e}`, {state:{art_eliminar: name_e}})
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
                            <div className="playlist-title"></div>
                           {/* <div style={{ height: '10px' }}></div> */}
                            <div className="playlist-stats">
                                <div className="song-name">{artista.name}</div>
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
                                {/* MODIFICAR ARTISTA */}
                                <button className="modific" onClick={()=> handleClick(artista.id)}> 
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
                    {console.log("Artista Id: ",artista.id," Id musical de artista: ", id_song)}
                    {isLoading && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {id_song ? <SongList_Artista id_song={id_song}/> : <p>No hay canciones disponibles</p>}

                </div>
            </div>
        </>
    );
}