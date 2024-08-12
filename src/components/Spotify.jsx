import React from "react";
import Artista from "./Spotify/Artista";
import Albunes from "./Spotify/Albunes";
import Generos from "./Spotify/Generos";
//import PlayLists from "./Spotify/PlayLists";

export default function Spotify(){

    return(
        <>
            <Generos/>
            <Albunes/>
            <Artista/>
        </>
    );
}