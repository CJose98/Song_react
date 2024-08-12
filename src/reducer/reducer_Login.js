import { ACTIONS } from "../actions/action_Login";

function reducer(state, action){

    switch (action.type) {
        case ACTIONS.LOGIN:        //Acción Inicio de sesión
            return{
                ...state,         //
                token: action.payload.token,
                username: action.payload.username,
                password: action.payload.password,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:      //Cierre de sesión de acciones
            return {
                //...state, 
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
export {reducer};