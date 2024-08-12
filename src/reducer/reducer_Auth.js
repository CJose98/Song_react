import { ACTIONS } from "../actions/action_Auth"; 

function reducer(state, action){  //Un reductor, es a una función que recibe un estado y una acción, esta última es un objeto que describe un cambio en el estado.
    switch (action.type) {
        case ACTIONS.FETCH_INIT: //Cuando la petición inicia y aún está en curso
            return{
                isError: false,
                isLoading: true
            };
        case ACTIONS.FETCH_SUCCESS: //Cuando la petición es exitosa
            return {
                data: action.payload,
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE: //Cuando la petición falla
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

export {reducer};