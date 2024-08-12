import { Navigate, useLocation } from "react-router-dom";
import use_Login from "../hooks/useContext_Login"

function ProtectedRoute({children}){
    const { isAuthenticated } = use_Login("state"); //obtenemos el estado
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/inicio" state={{from: location}}/>
    }
    return children;
}

export default ProtectedRoute;
