import React, {useRef} from "react";
import "../../styles/css/topBar_sideBar_footer.css"
//import useTopBar from "../../hooks/useTropBar" // La transparencia no esta resulta por el momento.

export default function TopBar(){
     //const topBarRef = useRef(null);

    //hook personalizado para los efectos secundarios
    //useTopBar(topBarRef);         //ref={topBarRef} //esto va en top bar

    return(
        <div className="topbar" >
            <div className="container-arrows">
                <div className="container-arrow-left">
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="container-arrow-right">
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className="buttons-user">
                <a href="#" className="btn-register">Registrarte</a>
                <a href="#" className="btn-login btn-full">Iniciar sesión</a>
            </div>
        </div>
    );
}