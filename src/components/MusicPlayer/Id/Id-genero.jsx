import useFetch from "../../../hooks/useFetch_Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IdGeneroSong({ id_song_p, nom_b}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken")

    console.log("DATA: ", id_song_p, "nombre: ", nom_b)

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `http://sandbox.academiadevelopers.com/harmonyhub/song-genres/`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        }
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar las musicas de genero</p>
    if (!data) return <p>No hay musica de genero disponible</p>

    //1* Filtramos las "Song Artist List" del artista seleccionado.
    const generoSongs = data.results.filter((gen) => String(gen.song) === String(id_song_p));
    const id_song = generoSongs.length > 0 ? generoSongs[0].id : null;

    const handleModificar = (subId) => {
        navigate(`/genero-song-update/${subId}`);
    }
    const handleClickEliminar = (subId_e, title_e) => {
        navigate(`/genero-song-eliminar/${subId_e}`, { state: { Song_title: title_e } });
    }

    return (
        <>
            <td className="song-date-added">
                <div>
                    {/* Botón para modificar */}
                    <button className="play" onClick={() => handleModificar(id_song)}>
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