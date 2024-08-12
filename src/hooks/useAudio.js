import React, { useState, useEffect } from "react";

const useAudio = (url) => {
    
    const [song, setSong] = useState(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (url) {
            const newSong = new Audio(url);
            setSong(newSong);
            newSong.addEventListener("ended", () => setPlay(false));
            return () => {
                newSong.removeEventListener("ended", () => setPlay(false));
            };
        }
    }, [url]);

    useEffect(() => {
        if (song) {
            play ? song.play().catch(error => console.error("Error al reproducir el audio:", error)) : song.pause();
        }
    }, [play, song]);

    const toggle = () => setPlay(!play);

    return [play, toggle];
};

export default useAudio;
