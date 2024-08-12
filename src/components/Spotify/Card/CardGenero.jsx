import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardGenero({ genero }) {
    const navigate = useNavigate();
    const [hoveredCard, sethoveredCard] = useState(null)/*  BOTON PLAY  */

    const handleClick = (subId) => {
        navigate(`/spotify/id-genero/${subId}`)
    }

    return (
        <div className="card-concentracion">
            <div className="card"
                onMouseEnter={() => sethoveredCard(genero.id)}
                onMouseLeave={() => sethoveredCard(null)}
            >
                <div className="card-img">
                    <img
                        id="imgId"
                        src="/img/concentracion/focus flow.jpg"
                        alt="Genero"
                        onError={(e) => { e.target.src = "/img/concentracion/focus flow.jpg"; }} // Manejo de errores de carga
                    />
                    {hoveredCard === genero.id && (
                        <button className='btn-play' onClick={() => handleClick(genero.id)}>
                            <i className='fa-solid fa-play'>
                                <img id="imgd" src="/img/concentracion/A_play.png" />
                            </i>
                        </button>
                    )}
                </div>
                <h2>{genero.name}</h2>
                <p>Genero</p>
            </div>
        </div>
    );
}