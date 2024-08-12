import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context_Login"
import { ACTIONS } from "../actions/action_Login";
import { reducer } from "../reducer/reducer_Login";

function Provider_Login({ children }){
    const navigate = useNavigate();
    const location = useLocation();

    const [state, dispatch] = useReducer(
        reducer,    // Inicialmente lanza a reducer que no esta autenticado
        {
        //token: localStorage.getItem("authToken"),
        //isAuthenticated: localStorage.getItem("authToken") ? true : false,
        isAuthenticated: false,
        token: null,
        username: null,
        password: null,
        }
    );
    const actions = {
        login: (token, username, password) =>{ // si obtuvimos un token en /Login === true
            dispatch({type: ACTIONS.LOGIN, payload: { token, username, password }});
            localStorage.setItem("AuthToken", token)
            const origin = location.state?.from?.pathname || "/";
            navigate(origin)
        },
        logout: () =>{
            dispatch({type: ACTIONS.LOGOUT});
            localStorage.removeItem("AuthToken")
        },
    };
    return (
        <AuthContext.Provider value={{state, actions}}>
            {children}
        </AuthContext.Provider>
    )
}
export default Provider_Login;