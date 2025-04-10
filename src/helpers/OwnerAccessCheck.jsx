import {useContext} from "react";
import AuthContext from "../context/AuthContext.jsx";

function OwnerAccessCheck({username, children}) {
    const {user} = useContext(AuthContext);

    const isOwner = user.username === username;
    return isOwner ? children : null;

}

export default OwnerAccessCheck;