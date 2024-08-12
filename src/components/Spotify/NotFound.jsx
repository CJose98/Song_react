import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container_create_artista">
      <div className="formulario_art">
            <h1>Página no encontrada</h1>
            <div>
                <img 
                    style={{ 
                        height:'300px',
                        width:'250px',
                        marginLeft:'10px'
                      }}
                    src="/img/concentracion/NotFound404.png" alt="logo" 
                />  
            </div>
              
            <div className="register-link">
              <button type="submit" className="btn">
                <Link to="../">
                    Volver al inicio
                </Link>
              </button>
            </div>
      </div>
    </div>
      );
};

export default NotFound;
