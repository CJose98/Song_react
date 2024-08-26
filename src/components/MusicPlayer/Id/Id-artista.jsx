import useFetch from "../../../hooks/useFetch_Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function IdArtistaSong({ id_art, id_song_p, nom_b }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")
    //Obtener Datos
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/song-artists/");

    console.log("artista_id: ", id_art, "musica_id", id_song_p, "nombre_genero: ", nom_b)

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
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

    if (isLoading) return <th>Cargando...</th>
    if (isError) return <th>Error al cargar las musicas de artista</th>
    if (songs.length === 0) return <th>No hay musica de artista disponible</th>

    //1* Filtramos las "Song Artist List" del artista seleccionado.
    const generoSongs = songs.filter((gen) => String(gen.song) === String(id_song_p) && String(gen.artist) === String(id_art));
    const id_song = generoSongs.length > 0 ? generoSongs[0].id : null;
    console.log("song-id_artista: ", generoSongs[0]);


    const handleModificar = (subId, id_a) => {
        navigate(`/artista-song-update/${subId}`, { state: { id_artista: id_a }});
    }
    const handleClickEliminar = (subId_e, title_e) => {
        navigate(`/artista-song-eliminar/${subId_e}`, { state: { titulo: title_e } });
    }

    return (
        <>
            <td className="song-date-added">
                <div>
                    {/* Botón para modificar */}
                    <button className="play" onClick={() => handleModificar(id_song, id_art)}>
                        <div className="song-image-play">
                            <img src="/img/concentracion/modificar.png" id="play_a" />
                        </div>
                    </button>
                </div>
            </td>
            <td className="song-duration">
                <div>
                    {/* Botón para eliminar */}
                    <button className="play" onClick={() => handleClickEliminar(id_song, nom_b)}>
                        <div className="song-image-play">
                            <img src="/img/concentracion/eliminar.png" id="play_a" />
                        </div>
                    </button>
                </div>
            </td>

        </>
    );
}