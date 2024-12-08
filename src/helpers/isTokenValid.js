import {jwtDecode} from "jwt-decode";


function isTokenValid(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
}

export default isTokenValid;