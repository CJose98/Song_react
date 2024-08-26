import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardArt({ artista }) {
    const navigate = useNavigate();
    const [hoveredCard, sethoveredCard] = useState(null)/*  BOTON PLAY  */

    const handleClick = (subId, name_art, img_art) => {
        navigate(`/spotify/id-artista/${subId}`)
    }

    return (
        <div className="card-concentracion">
            <div className="card"
                onMouseEnter={() => sethoveredCard(artista.id)}
                onMouseLeave={() => sethoveredCard(null)}
            >
                <div className="card-img">
                    <img
                        id="imgId"
                        src={artista.image ? artista.image : "/img/concentracion/beats to think.jpg"}//src="/img/concentracion/beats to think.jpg"//src={artista.image ? artista.image : "/img/concentracion/beats to think.jpg"}
                        alt={artista.name || 'Artista'}
                        onError={(e) => { e.target.src = "/img/concentracion/beats to think.jpg"; }} // Manejo de errores de carga
                    />
                    {hoveredCard === artista.id && (
                        <button className='btn-play' onClick={() => handleClick(artista.id, artista.name, artista.image)}>
                            <i className='fa-solid fa-play'>
                                <img id="imgd" src="/img/concentracion/A_play.png" />
                            </i>
                        </button>
                    )}
                </div>
                <h2>{artista.name}</h2>
                <p>Artista</p>
            </div>
        </div>
    );
}