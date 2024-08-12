import "../../styles/css/artista.css"
import useFetch from "../../hooks/useFetch_Auth";
import { useEffect, useState} from "react";
import CardGenero from "./Card/CardGenero";

export default function Generos() { 
    const [generos, setGenero] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/genres/");
    
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token

    const[{data, isError, isLoading}, doFetch] = useFetch(
        nextUrl,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
        }
    );

    function ensureHttps(url) {
        if (url.startsWith("http://")) {
            url = "https://" + url.slice(7);
        }
        return url;
    }

    useEffect(()=>{
        if (data){
            setGenero(prevAlbums => [...prevAlbums, ...data.results]);
            if (data.next){
                setNextUrl(ensureHttps(data.next));
            }   
        }
    },[data])

    useEffect(()=>{
        //si la url no es nula ejecuta doFetch
        if (nextUrl){
            doFetch(nextUrl, 
                { //OPTIONS
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',    'Authorization': `Token ${token}`},
                }
            ); //cuanfo la url cambia hace una nueva peticion a la paginna siguiente(siempre q exista)
        }
    },[nextUrl]);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error al cargar los Generos</p>
    if (generos.length === 0) return <p>No hay Generos disponibles</p>


    return (
        <div className="container-name-concentracion">
            <h1 className="title-playlist">Generos populares</h1>
                
                {/*console.log("total de generos: ", generos.length)*/}

                <div className="container-card-concentracion">
                    {generos.map((genero)=>(
                        <CardGenero genero={genero} key={genero.id}/>
                    ))}
                 </div> 
        </div>
    );
}                        