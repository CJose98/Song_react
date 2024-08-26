import React, {useContext , useRef} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/css/topBar_sideBar_footer.css"
import useTopBar from "../../hooks/useTropBar" // La transparencia no esta resulta por el momento.
import { AuthContext } from "../../contexts/Context_Login";

export default function TopBar(){
    const navigate = useNavigate();
    const { state } = useContext(AuthContext)
     //const topBarRef = useRef(null);
    //hook personalizado para los efectos secundarios
    //useTopBar(topBarRef);         //ref={topBarRef} //esto va en top bar

    const handleClickLogin=(e)=>{
        e.preventDefault();
        navigate('/login');
    }
    const handleClickSalir=(e)=>{
        e.preventDefault();
        navigate('/inicio');
    }

    const goBack = (e) =>{
        e.preventDefault();
        navigate(-1); //navegar hacia atras
    }
    const goForward = (e) =>{
        e.preventDefault();
        navigate(1); //navegar hacia adelante
    }

    return(
        <div className="topbar" >
            <div className="container-arrows">
                <div className="container-arrow-left">
                    <button className="btn-go" onClick={goBack}>
                        <i className="fa-solid fa-chevron-left">
                        {"<"}
                        </i>
                    </button>
                </div>
                <div className="container-arrow-right">
                    <button className="btn-go" onClick={goForward}>
                        <i className="fa-solid fa-chevron-right">
                        {">"}
                        </i>
                    </button>
                </div>
                    
            </div>
            <div className="buttons-user">
                 <a href="#" className="btn-register" onClick={handleClickSalir}>Salir</a>
                 { state.username ? <a className="btn-login btn-full">Jose_Luis.roi</a> : <a href="#" className="btn-login btn-full" 
                    onClick={handleClickLogin}>Iniciar sesión</a>
                 }
            </div>
        </div>
    );
}