import {useContext} from "react";
import AuthContext from "../context/AuthContext.jsx";

function AdminAccessCheck({children}) {
    const {isAuth, authorities} = useContext(AuthContext);

    const isAdmin = isAuth && authorities && authorities.includes(authorities['ADMIN']);

    if (isAdmin) {
        return children;
    }
}


export default AdminAccessCheck;