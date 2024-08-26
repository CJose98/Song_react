import { useReducer } from "react";
import { ACTIONS } from "../actions/action_Auth";
import { reducer } from  "../reducer/reducer_Auth"

function useFetch(url, options = {}) {

    const [state, dispatch] = useReducer(
        reducer,
        { isError: false, isLoading: true, data: null }
    );

    const doFetch = async (newUrl = url, newOptions = {}) => {
        dispatch({ type: ACTIONS.FETCH_INIT });

        try {
            const response = await fetch(newUrl, { ...options, ...newOptions });
            if (!response.ok) throw new Error("Error al realizar la petición");

            // Verifica si la respuesta tiene contenido antes de intentar parsearla
            let data = null;
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                
            }
            //const data = await response.json();
            dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            
            //console.log("datos de fetch:", data.results)
            return data; // Devuelve los datos
        } catch (e) {
            dispatch({ type: ACTIONS.FETCH_FAILURE });
            throw e; // Propaga el error
        }
    };

    return [state, doFetch];
}










/*
function useFetch(url, options = {}){       //recimivos los datos
    //console.log("url: ", url)

    const [state, dispatch] = useReducer(   //useReducer, el cual nos permite gestionar estados complejos de una forma más eficiente y segura.
        reducer,                            //Un reductor, función que acabamos de analizar.
        {isError: false, isLoading: true, data: null}  //Un estado inicial, que representa el estado inicial del componente.
        ); 

    function doFetch(newOptions) {
        dispatch({ type: ACTIONS.FETCH_INIT});

        fetch(url, {...options, ...newOptions})
            .then((response) =>{
                if (response.ok){
                    return response.json();
                }
                throw Error("Error al realizar la peticion")
            })
            .then((data) =>{
                dispatch({type: ACTIONS.FETCH_SUCCESS, payload: data});
            })
            .catch((e) =>{
                dispatch({type: ACTIONS.FETCH_FAILURE});
            })
    }

    return [state, doFetch]
} 
*/
export default useFetch ;