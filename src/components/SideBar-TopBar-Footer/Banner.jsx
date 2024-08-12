import React from "react";
import "../../styles/css/topBar_sideBar_footer.css"

export default function Banner(){
    return(
        <div className="banner-bottom">
            <div className="content">
                <span>Muestra de spotify</span>
                <p>
                    Regístrate para disfrutar de canciones y podcasts sin
                    límites, con anuncios ocasionales. No hace falta tarjeta de
                    crédito
                </p>
            </div>
            <button className="btn-full">Registrarte gratis</button>
        </div>
    );
}