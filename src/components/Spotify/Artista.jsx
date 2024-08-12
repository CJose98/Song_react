import "../../styles/css/artista.css"
import useFetch from "../../hooks/useFetch_Auth";
import { useEffect, useState} from "react";
import CardArt from "./Card/CardArtista";

export default function Artista() {
    const [artists, setArtists] = useState([]);
    const [nextUrl, setNextUrl] = useState("https://sandbox.academiadevelopers.com/harmonyhub/artists/");
    
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
            setArtists(prevArtists => [...prevArtists, ...data.results]);
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
    if (isError) return <p>Error al cargar los artistas</p>
    if (artists.length === 0) return <p>No hay artista disponibles</p>


    return (
        <div className="container-name-concentracion">
            <h1 className="title-playlist">Artistas populares</h1>
                
                {/*console.log("total: ", artists.length)*/}

                {data.next === "null" ? <p>Cargando...</p> :
                <div className="container-card-concentracion">
                    {artists.map((artista)=>(
                        <CardArt artista={artista} key={artista.id}/>
                    ))}
                 </div> 
                 }
        </div>
    );
}                        