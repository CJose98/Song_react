import { Outlet, useLocation } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import useTheme from "../hooks/useTheme";
import Provider_Login from "../contexts/UseProvider_login";
import TopBar from "../components/SideBar-TopBar-Footer/TopBar"
import SideBar from "../components/SideBar-TopBar-Footer/SideBar"
import Footer from "../components/SideBar-TopBar-Footer/Footer"
import Banner from "../components/SideBar-TopBar-Footer/Banner"
import "../styles/css/body.css"

export default function Layout() {
    const [theme, toggleTheme] = useTheme();
    const location = useLocation();
    const isInicio = location.pathname === "/inicio";
    const isLogin = location.pathname === "/login";

    // Determina si estamos en una de las páginas específicas
    //const isSpecificPage = isLogin || isInicio;

    // Define clases condicionales basadas en la ruta
    const mainClassName = isLogin ? 'login-container' : isInicio ? 'inicio-container' : 'main container';
    const contentClassName = isLogin ? '' : isInicio ? '' : 'main-content';

    return (
        <Provider_Login>
                <main className={mainClassName}>
                    {(!isInicio && !isLogin) && <TopBar/>}
                    {(!isInicio && !isLogin)  && <SideBar/>}
                     <section className={contentClassName}>  
                        <Outlet />
                    </section>  
                    {(!isInicio && !isLogin)  && <Footer/>}
                </main>
                <Banner />
        </Provider_Login>
    );
}
