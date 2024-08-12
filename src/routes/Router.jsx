import SongList from "../components/MusicPlayer/SongList_Artista";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtecRouter";
import NotFound from "../components/Spotify/NotFound";
import Layout from "./Layout";
import Login from "../components/Auth/Login";
import Inicio from "../components/Auth/Inicio";
import Perfil from "../components/Auth/Perfil";

import Spotify from "../components/Spotify";
//ARTISTA
import IdArtista from "../components/SongLibrary/id_spotify/Id_Arista";
import CreateArtista from "../components/Create/CreateArtista"
import UpdateArtist from "../components/Update/UpdateArtist";
import DeleteArtista from "../components/Delete/DeleteArtista";
//ARTISTA-SONG
import CreateSongArtista from "../components/Create/CreateSong-Artista";
import DeleteSongArtista from "../components/Delete/DeleteSongArtista";
import UpdateSongArtista from "../components/Update/UpdateSong-Art";
//* ALBUM*/
import IdHalbum from "../components/SongLibrary/id_spotify/Id_Halbum";
import UpdateAlbum from "../components/Update/UpdateAlbum";
import DeleteAlbum from "../components/Delete/DeleteAlbum";
import CreateAlbum from "../components/Create/CreateAlbum";
//* ALBUM SONG*/

//* GENERO*/
import IdGenero from "../components/SongLibrary/id_spotify/id_Genero";
import DeleteGenero from "../components/Delete/DeleteGenero";
import UpdateGenero from "../components/Update/UpdateGenero";
import CreateGenero from "../components/Create/CreateGenero";
//* GENERO-SONG*/
import UpdateSongGenero from "../components/Update/UpdateSong-Genero";
import DeleteSongGenero from "../components/Delete/DeleteSongGenero";
import CreateSongGenero from "../components/Create/CreateSong-genero";

//MUSICA-SONG*/
import CreateMusica from "../components/Create/CreateMusica";
import MusicaSong from "../components/MusicPlayer/Musica-Lista";
import DeleteMusica from "../components/Delete/DeleteMusica";
import UpdateMusica from "../components/Update/UpdateMusica";


export const Router = createBrowserRouter(
    [
        {
            element: <Layout />,
            children: [

                {
                    path: "*",
                    element: (
                        <ProtectedRoute>
                            <NotFound />
                        </ProtectedRoute>
                    ),
                    element: <NotFound />
                },
                {
                    path: "/inicio",
                    element: <Inicio />
                },
                {
                    path: "/login",
                    element: <Login />,
                },

                //********* */
                //Paginas ... PUBLICA   ___*-*
                //******** */
                //********* */
                //GLOBAL
                //******** */
                {
                    path: "*",
                    element: <NotFound />
                },
                {
                    path: "/spotify-public", // pagina publica: sin token 
                    element: <Spotify />,
                },
                //********* */
                //ARTISTA------> --{ public
                //******** */
                {
                    path: "/spotify/id-artista/:id",
                    element: (
                            <IdArtista />
                    ),
                },
                {
                    path: "/artista-create",
                    element: (
                            <CreateArtista />
                    ),
                },
                {
                    path: "/artista-update/:id",
                    element: (
                            <UpdateArtist />
                    ),
                },
                {
                    path: "/eliminar-artista/:id",
                    element: (
                            <DeleteArtista />
                    ),
                },
                //********* */
                //ARTISTA - SONG ------> --{ public
                //******** */
                {
                    path: "/song-artista-create",
                    element: (
                            <CreateSongArtista />
                    ),
                },
                {
                    path: "/artista-song-update/:id",
                    element: (
                            <UpdateSongArtista />
                    ),
                },
                {
                    path: "/artista-song-eliminar/:id",
                    element: (
                            <DeleteSongArtista />
                    ),
                },
                //********* */
                //ALBUM ------> --{ public
                //******** */
                {
                    path: "/spotify/album-song/:id",
                    element: (
                            <IdHalbum />
                    ),
                },
                {
                    path: "/album-create",
                    element: (
                            <CreateAlbum />
                    ),
                },
                {
                    path: "/album-update/:id",
                    element: (
                            <UpdateAlbum />
                    ),
                },
                {
                    path: "/album-eliminar/:id",
                    element: (
                            <DeleteAlbum />
                    ),
                },
                 //********* */
                //GENEROS ------> --{ public
                //******** */
                {
                    path: "/spotify/id-genero/:id",
                    element: (
                            <IdGenero />
                    ),
                },
                {
                    path: "/genero-create",
                    element: (
                            <CreateGenero />
                    ),
                },
                {
                    path: "/genero-eliminar/:id",
                    element: (
                            <DeleteGenero />
                    ),
                },
                {
                    path: "/genero-update/:id",
                    element: (
                            <UpdateGenero />
                    ),
                },
                //********* */
                //GENEROS-SONG ------> --{ public
                //******** */
                {
                    path: "/song-genero-create",
                    element: (
                            <CreateSongGenero />
                    ),
                },
                {
                    path: "/genero-song-eliminar/:id",
                    element: (
                            <DeleteSongGenero />
                    ),
                },
                {
                    path: "/genero-song-update/:id",
                    element: (
                            <UpdateSongGenero />
                    ),
                },
                 //********* */
                //MUSICA-SONG ------> --{ public
                //******** */
                {
                    path: "/musica-create",
                    element: (
                            <CreateMusica />
                    ),
                },
                {
                    path: "/lista-music",
                    element: (
                            <MusicaSong />
                    ),
                },
                {
                    path: "/songs-song-eliminar/:id",
                    element: (
                            <DeleteMusica />
                    ),
                },
                {
                    path: "/songs-song-update/:id",
                    element: (
                            <UpdateMusica />
                    ),
                },





                //********* */
                //Paginas  ... PRIVADA   ___*-*
                //******** */
                //********* */
                //GLOBAL
                //******** */
                {
                    index: true, //index:true, // path: "/"
                    element: (
                        <ProtectedRoute>
                            <Spotify />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/perfil",
                    element: (
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    ),
                },
                //********* */
                //ARTISTA
                //******** */
                {
                    path: "/spotify/id-artista/:id",
                    element: (
                        <ProtectedRoute>
                            <IdArtista />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/artista-create",
                    element: (
                        <ProtectedRoute>
                            <CreateArtista />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/artista-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateArtist />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/eliminar-artista/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteArtista />
                        </ProtectedRoute>
                    ),
                },
                //********* */
                //ARTISTA - SONG
                //******** */
                {
                    path: "/song-artista-create",
                    element: (
                        <ProtectedRoute>
                            <CreateSongArtista />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/artista-song-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateSongArtista />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/artista-song-eliminar/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteSongArtista />
                        </ProtectedRoute>
                    ),
                },
                //********* */
                //ALBUM
                //******** */
                {
                    path: "/spotify/album-song/:id",
                    element: (
                        <ProtectedRoute>
                            <IdHalbum />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/album-create",
                    element: (
                        <ProtectedRoute>
                            <CreateAlbum />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/album-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateAlbum />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/album-eliminar/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteAlbum />
                        </ProtectedRoute>
                    ),
                },
                //********* */
                //GENEROS
                //******** */
                {
                    path: "/spotify/id-genero/:id",
                    element: (
                        <ProtectedRoute>
                            <IdGenero />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/genero-create",
                    element: (
                        <ProtectedRoute>
                            <CreateGenero />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/genero-eliminar/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteGenero />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/genero-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateGenero />
                        </ProtectedRoute>
                    ),
                },
                //********* */
                //GENEROS-SONG
                //******** */
                {
                    path: "/song-genero-create",
                    element: (
                        <ProtectedRoute>
                            <CreateSongGenero />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/genero-song-eliminar/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteSongGenero />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/genero-song-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateSongGenero />
                        </ProtectedRoute>
                    ),
                },
                 //********* */
                //MUSICA-SONG
                //******** */
                {
                    path: "/musica-create",
                    element: (
                        <ProtectedRoute>
                            <CreateMusica />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/lista-music",
                    element: (
                        <ProtectedRoute>
                            <MusicaSong />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/songs-song-eliminar/:id",
                    element: (
                        <ProtectedRoute>
                            <DeleteMusica />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/songs-song-update/:id",
                    element: (
                        <ProtectedRoute>
                            <UpdateMusica />
                        </ProtectedRoute>
                    ),
                },

            ],
        },
    ],
    {
        basename: "/Song_react/",
    },
);