import { useContext } from "react";
import { AuthContext } from "../contexts/Context_Login";

function use_Login(type){
    const contexts = useContext(AuthContext);
    
    if (contexts === undefined){
        throw new Error("La autenticación de usuario debe usarse dentro de un AuthProvider")
    }
    return contexts[type];

}
export default use_Login;

/*
1* Use_login se ejecuta.
    -Obtiene la informacion que tenga AuthContext
    -si esta autenticado retorna el typo (state, action)

2* En Proveedor de contexto 
    a)-Ejecuta el REDUCER con Autenticacion en falso
    
    b)-Luego ejecutara la ACTION.TYPE que nos de el PROVEEDOR.

    -si el user esta logeado:      ACTION.LOGIN
    -si el user esta sin servicio: ACTION.LOGOUT

4*  AuthContext
    Retorna la informacion que obtenemos en Provider:
    <AuthContext.Provider value={{state, actions}}>
            {children}
    </AuthContext.Provider>

*/