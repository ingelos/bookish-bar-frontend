import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import LoginForm from "../../components/loginForm/LoginForm.jsx";
import axios from "axios";

function Login() {
    const { user, login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    async function handleLogin(formData) {
        setError(false);

        try {
            const {data} = await axios.post('http://localhost:8080/login', {
                username: formData.username,
                password: formData.password,
            });
            const {jwt} = data;
            await login(jwt);
            setLoginSuccess(true);

        } catch (error) {
            if (error.response) {
                const {status, data} = error.response;
                switch (status) {
                    case 401:
                        console.error('Authentication failed: Invalid username or password');
                        setErrorMessage('Authentication failed: Invalid username or password');
                        break;
                    case 404:
                        console.error('No user found with this username');
                        setErrorMessage(data || 'No user found');
                        break;
                    default:
                        console.error('Unexpected error:', data?.message || 'An unknown error occurred.');
                        setErrorMessage('An error occurred. Please try again.')
                }
            } else {
                console.error('Unknown error:', error.message);
                setErrorMessage('An unknown error occurred. Please try again');
            }
        }
    }



    return (

        <div className="login-page outer-container">
            <div className="login-page inner-container">
                <div className="inner-content-container">
                    <h2 className="register-title titles">Login</h2>
                    {!loginSuccess ? (
                        <div>
                            {error && <p>{error}</p>}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <LoginForm onSubmit={handleLogin}/>
                        </div>
                    ) : (
                        <div>
                            <h3 className='login-title titles'>Successfully logged in!</h3>
                            <Link to={`/user/${user.username}`} className='link-button-style'>My account</Link>
                        </div>
                    )}
                    <div>
                        <p><strong>New here?</strong></p>
                        <Link to={'/register'} className='link-to-register'>Make an account in one minute!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;