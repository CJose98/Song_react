import "../../styles/css/artista_song.css"
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch_Auth"
import { useNavigate } from "react-router-dom";
import SongList_Genero from "../MusicPlayer/SongList_Genero"

export default function GeneroSong({genero}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")
    const[{data, isError, isLoading}, doFetch] = useFetch(
        `http://sandbox.academiadevelopers.com/harmonyhub/song-genres/`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
        }
    );

    useEffect(()=>{
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar las musicas de genero</p>
    if (!data) return <p>No hay musica de genero disponible</p>

     //1* Filtramos las "Song Artist List" del artista seleccionado.
    const generoSongs = data.results.filter((gen)=> String(gen.genre) === String(genero.id));
    const id_song = generoSongs.length > 0 ? generoSongs[0].song : null;

    //Envio de datos para crear artista
    const handleClickModificar =(subId)=>{
        navigate(`/genero-update/${subId}`)
    }

    const handleClickEliminar =(subId_e, name_e)=>{
        navigate(`/genero-eliminar/${subId_e}`, {state:{genero_eliminar: name_e}})
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
                                src="/img/concentracion/focus flow.jpg"
                                alt= 'Artista'
                                onError={(e) => { e.target.src = "/img/concentracion/focus flow.jpg"; }} // Manejo de errores de carga
                            />
                        </div>
                        <div className="playlist-info">
                            <div className="playlist-title">{genero.name}</div>
                           {/* <div style={{ height: '10px' }}></div> */}
                            <div className="playlist-stats">
                                <div className="song-name">Genero</div>
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
                                <button className="modific" onClick={()=> handleClickEliminar(genero.id, genero.name)}> 
                                    <div className="song-image-play">
                                        <img src="/img/concentracion/eliminar.png" id="imghh"/>
                                    </div>
                                </button>
                            </div>
                            <div className="playlist-buttons-three-dot">
                                {/* MODIFICAR ALBUM */}
                                <button className="modific" onClick={()=> handleClickModificar(genero.id)}> 
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
                    {console.log("Genero Id: ",genero.id," Id musical de genero: ", id_song)}
                    {isLoading && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar las musicas de genero</p>}
                    {id_song? <SongList_Genero id_song={id_song}/> : <p>No hay musica de genero disponible</p>}

                </div>
            </div>
        </>
    );
}