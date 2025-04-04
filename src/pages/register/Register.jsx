import "./Register.css";
import {useState} from "react";
import axios from "axios";
import RegisterForm from "../../components/registerForm/RegisterForm.jsx";
import {Link} from "react-router-dom";
import CaretLeftIcon from "../../assets/icons/caret-left.svg";

function Register() {
    const [error, setError] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(null);

    async function handleRegister(formData) {
        setError(null);
        console.log("Formdata:", formData);

        try {
            const {data} = await axios.post('http://localhost:8080/users', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                // authority: [data.user],
            });
            console.log('response:', data);
            console.log(`You've created an account!`);
            setRegisterSuccess(true);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Username already in use';
                console.error('Registration failed:', errorMessage);
                setError(true);
            } else {
                console.error('Error:', error.message);
                setError(true);
            }
        }
    }


    return (
        <div className="register-page outer-container">
            <div className="register-page inner-container">
                <div className="inner-content-container">
                    <div className="register-container">

                        {error && <p>Error...</p>}
                        {!registerSuccess ?
                            <div>
                                <h2 className="register-title titles">Create account</h2>
                                <RegisterForm onSubmit={handleRegister}/>
                                <div className='back-link'>
                                    <img src={CaretLeftIcon} alt='caret-left' className='caret-left'/>
                                    <p className='back-to-login-link'><Link to='/login'><strong>Go back</strong></Link>
                                    </p>
                                </div>
                            </div>
                            :
                            <div className='success-container'>
                                <h2>Congratulations!</h2>
                                <p>You now have an account!</p>
                                <p>Log in <Link to={`/login`}><strong>here</strong></Link></p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;