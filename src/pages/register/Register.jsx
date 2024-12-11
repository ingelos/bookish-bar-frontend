import {useState} from "react";
import axios from "axios";
import RegisterForm from "../../components/registerForm/RegisterForm.jsx";
import {Link} from "react-router-dom";
import CaretLeftIcon from "../../assets/icons/caret-left.svg";

function Register() {
    const [error, setError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    async function handleRegister(data) {
        setError(false);

        try {
            const response = await axios.post('http://localhost:8080/users', {
                username: data.username,
                email: data.email,
                password: data.password,
                authority: [data.user],
            });
            console.log('response:', response);
            console.log(`You've created an account!`);
            setSubmitSuccess(true);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Username already in use';
                console.error('Authentication failed:', errorMessage);
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
                    <h2 className="register-title titles">Create account</h2>
                    {error && <p>Error...</p>}
                    {!submitSuccess ?
                        <div>
                            <RegisterForm onSubmit={handleRegister}/>
                            <div className='back-to-login'>
                                <img src={CaretLeftIcon} alt='caret-left' className='caret-left'/>
                                <p className='back-to-login-link'><Link to='/login'><strong>Go back</strong></Link>
                                </p>
                            </div>
                        </div>
                        :
                        <div className='succes-container'>
                            <h2>Congratulations!</h2>
                            <p>You`&apos;`ve created an account!</p>
                            <p>You can now log in <Link to={`/login`}><strong>here</strong></Link></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register;