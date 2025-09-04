import { useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import isTokenValid from "../helpers/isTokenValid.js";
import axios from "axios";
import AuthContext from "./AuthContext.jsx";
import {jwtDecode} from "jwt-decode";


export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        authorities: [],
        profilePhotoUrl: null,
        status: 'pending',
    });


    const navigate = useNavigate();

    const login = useCallback(async(token) => {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const id = decodedToken?.id;

        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            const userData = response.data;

            setAuth({
                isAuth: true,
                user: {
                    username: userData.username,
                    email: userData.email,
                    id: userData.id,
                },
                authorities: userData.authorities || [],
                profilePhotoUrl: null,
                userProfileData: null,
                status: 'done',
            });

            fetchProfileData(userData.id);

        } catch (error) {
            console.error("Error fetching user data:", error);
            logout();
        }
    }, []);


    async function fetchProfileData(userId) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const profileData = response.data;

            setAuth(prevAuth => ({
                ...prevAuth,
                userProfileData: {
                    firstname: profileData.firstname || null,
                    lastname: profileData.lastname || null,
                    about: profileData.about || null,
                },
                profilePhotoUrl: profileData.profilePhotoUrl || null,
            }));
        } catch(error) {
            console.error(`Failed to fetch profile data`, error);
        }
    }


    const logout = useCallback(() =>  {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            authorities: [],
            profilePhotoUrl: null,
            userProfileData: null,
            status: 'done',
        });

        navigate('/');
    }, [navigate]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                authorities: [],
                profilePhotoUrl: null,
                status: 'done',
            });
            localStorage.removeItem('token');
        }

        const intervalId = setInterval(() => {
            if (token && !isTokenValid(token)) {
                setAuth({
                    isAuth: false,
                    user: null,
                    authorities: [],
                    profilePhotoUrl: null,
                    status: 'done',
                });
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }
        }, 60000);
        return () => clearInterval(intervalId);

    }, [login, navigate]);

    const contextData = {
        isAuth: auth.isAuth,
        username: auth.user ? auth.user?.username : null,
        user: auth.user || {},
        authorities: auth.authorities || [],
        userProfileData: auth.userProfileData || null,
        profilePhotoUrl: auth.profilePhotoUrl || null,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;