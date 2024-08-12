import "../../styles/css/artista_song.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch_Auth"
import useAudio from "../../hooks/useAudio"
import { useNavigate } from "react-router-dom";

export default function MusicaSong() {
    const navigate = useNavigate();
    const [song_play, setSong_play] = useState("");
    const [playMusic, setMusic] = useAudio(song_play);
    const [songs, setSongs] = useState([]);
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/songs/");


    const [{ data, isError, isLoading }, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        }
    );
    function ensureHttps(url) {
        if (url.startsWith("http://")) {
            url = "https://" + url.slice(7);
        }
        return url;
    }
    useEffect(() => {
        if (data) {
            setSongs(prevAlbums => [...prevAlbums, ...data.results]);
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
    if (isError) return <p>Error al cargar las musicas</p>
    if (songs.length === 0) return <p>No hay musicas disponibles</p>

    const handlePlay = (music_busc) => {
        console.log(music_busc)
        console.log("?**? ",playMusic)
        if (music_busc) {
            setSong_play(music_busc); // Actualizar song_play
            setMusic(); // Alternar la reproducción
        } else {
            console.error("La URL del archivo de audio no es válida.");
        }
    };

    const handleModificar = (subId) => {
        navigate(`/songs-song-update/${subId}`);
    }
    const handleClickEliminar = (subId_e, title_e) => {
        navigate(`/songs-song-eliminar/${subId_e}`, { state: { musica_eliminar: title_e } });
    }

    return (
        <div className="container_artista_song">
            <div className="playlist-songs">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Date Added</th>
                            <th>
                                <img src="/img/asset/Duration.svg" id="imgj" />
                            </th>
                            <th>modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    {songs.map((song) => (
                    <tbody>
                        <tr key={song.id}>
                            <td>
                                <div>
                                    <audio controls>
                                        <source src={song.song_file} type="audio/mpeg" />
                                    </audio>

                                    {/* Botón para alternar la reproducción 
                                    <button className="play" onClick={() => handlePlay(song.song_file)}>
                                        {/*playMusic ? "Pausar" : "Reproducir"  
                                        <div className="song-image-play">
                                            <img src="/img/concentracion/A_play.png" id="play_a" />
                                        </div>
                                    </button>
                                    */}
                                </div>
                            </td>
                            <td className="song-title">
                                <div className="song-image">
                                    <img 
                                        src="/img/concentracion/coding mode.jpg" 
                                        id="imgj" 
                                    />
                                </div>
                                <div className="song-name-album">
                                    <div className="song-name">{song.title}</div>
                                    <div className="song-artist">song</div>
                                </div>
                            </td>
                            <td className="song-album">Mix Pop</td>
                            <td className="song-date-added">{song.year}</td>
                            <td className="song-duration">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</td>

                            <td className="song-date-added">
                                <div>
                                    {/* Botón para modificar */}
                                    <button className="play" onClick={() => handleModificar(song.id)}>
                                        <div className="song-image-play">
                                            <img src="/img/concentracion/modificar.png" id="play_a" />
                                        </div>
                                    </button>
                                </div>
                            </td>
                            <td className="song-duration">
                                <div>
                                    {/* Botón para eliminar */}
                                    <button className="play" onClick={() => handleClickEliminar(song.id, song.title)}>
                                        <div className="song-image-play">
                                            <img src="/img/concentracion/eliminar.png" id="play_a" />
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}