import { useState } from "react";
import useFetch from "../../hooks/useFetch_Auth";
import { useEffect } from "react";
import useAudio from "../../hooks/useAudio"
import IdGeneroSong from "./Id/Id-genero";

export default function SongList_Album({id_song}) {
    const [song_play, setSong_play] = useState("");
    // Usa el hook personalizado con una URL de canción de ejemplo
    const [playMusic, setMusic] = useAudio(song_play);


    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id_song}`,
        {
        }
    );

    useEffect(() => {
            doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!data) return <p>No hay canciones disponibles</p>;

    const handlePlay = () => {
        if (data.song_file) {
            setSong_play(data.song_file); // Actualizar song_play
            setMusic(); // Alternar la reproducción
        } else {
            console.error("La URL del archivo de audio no es válida.");
        }
    };
    
    return (
        <div className="playlist-songs">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th>
                        <img src="/img/asset/Duration.svg" id="imgj"/>
                    </th>
                    <th>modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr key={data.id}>
                    <td>
                        <div>
                            {/* Botón para alternar la reproducción */}
                           <button className="play" onClick={handlePlay}> 
                                {/*playMusic ? "Pausar" : "Reproducir"*/} 
                                <div className="song-image-play">
                                    <img src="/img/concentracion/A_play.png" id="play_a"/>
                                </div>
                            </button>
                        </div>
                    </td>
                    <td className="song-title">
                        <div className="song-image">
                            <img src="/img/concentracion/coding mode.jpg" id="imgj"/>
                        </div>
                        <div className="song-name-album">
                            <div className="song-name">{data.title}</div>
                            <div className="song-artist">song</div>
                        </div>
                    </td>
                    <td className="song-album">Young as the Morning old as the Sea</td>
                    <td className="song-date-added">{data.year}</td>
                    <td className="song-duration">{Math.floor(data.duration / 60)}:{(data.duration % 60).toString().padStart(2, '0')}</td>

                   
                    <IdAlbumSong id_song_p={data.id} nom_b={data.title}/>
                </tr>   
            </tbody>
        </table>
    </div>
    );
}
