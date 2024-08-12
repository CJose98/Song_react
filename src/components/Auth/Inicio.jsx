import React from "react";
import "../../styles/css/inicio.css"
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
        <img src="/img/concentracion/marco_spotify.jpg" id="marco2"/>
            <button className="btnfos btnfos-3" id="b1" onClick={()=> navigate('/spotify-public')}>connect</button>
            <button className="btnfos btnfos-3" id="b2" onClick={()=> navigate('/login')}>login</button>
    </div>  
  );
}
