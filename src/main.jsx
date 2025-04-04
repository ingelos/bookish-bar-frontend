import React from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
);
