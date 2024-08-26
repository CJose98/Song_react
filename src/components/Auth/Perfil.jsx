import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Context_Login";

export default function Perfil() {
    const { state } = useContext(AuthContext); // Obtenemos el estado del contexto

   
    return(
        <div className="container_create_artista">
            <div className="formulario_art">
                <form id="loginForm">
                    <h1>Perfil</h1>
                    <div className="icons">
                        <img src="/img/concentracion/spotify.png" alt="logo"/>
                    </div>
                    <div className="register-link">
                        <p>Usuario</p>
                        <h3>{state.username}</h3>    
                    </div>
                    <div className="register-link">
                        <p>Password</p>
                        <h3>{state.password}</h3>
                    </div>
                </form>
            </div>
        </div>
    );
}
