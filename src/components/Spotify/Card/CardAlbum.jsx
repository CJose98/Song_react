import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardAlbum({ album }) {
    const navigate = useNavigate();
    const [hoveredCard, sethoveredCard] = useState(null)/*  BOTON PLAY  */

    const handleClick = (subId, nombre_a, img_a) => {
        navigate(`/spotify/album-song/${subId}`, {state:{nombre_alb:nombre_a, imagen_alb:img_a}})
    }

    return (
        <div className="card-concentracion">
            <div className="card"
                onMouseEnter={() => sethoveredCard(album.id)}
                onMouseLeave={() => sethoveredCard(null)}
            >
                <div className="card-img">
                    <img
                        id="imgId"
                        src="/img/concentracion/peacefulpiano.jpg"//src={album.cover ? album.cover : "/img/concentracion/peacefulpiano.jpg"}
                        alt="Album"
                        onError={(e) => { e.target.src = "/img/concentracion/peacefulpiano.jpg"; }} // Manejo de errores de carga
                    />
                    {hoveredCard === album.id && (
                        <button className='btn-play' onClick={() => handleClick(album.id, album.title, album.cover)}>
                            <i className='fa-solid fa-play'>
                                <img id="imgd" src="/img/concentracion/A_play.png" />
                            </i>
                        </button>
                    )}
                </div>
                <h2>{album.title}</h2>
                <p>Album</p>
            </div>
        </div>
    );
}