
import {FaLongArrowAltLeft} from "react-icons/fa";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";
import PasswordForm from "../../components/passwordForm/PasswordForm.jsx";
import axios from "axios";
import EmailForm from "../../components/emailForm/EmailForm.jsx";


function EditAccount() {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false);
    const [updateEmailSuccess, setUpdateEmailSuccess] = useState(false);
    const token = localStorage.getItem('token');

    async function editPassword(formData) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/password`, {
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Password successfully updated', data);
            setUpdatePasswordSuccess(true);
        } catch (error) {
            console.error('Error updating password', error);
            setError(true);
        }
    }

    async function editEmail(formData) {
        setError(false);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.username}/email`, {
                email: formData.email,
                currentPassword: formData.currentPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setUpdateEmailSuccess(true);
            console.log(`Account details successfully updated`, data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Invalid password");
            }
            console.error(error);
            setError(true);
        }
    }




    return (
        <section className="edit-account-page outer-container">
            <div className="edit-account-page inner-container">
                <div className="edit-account inner-content-container">
                    <h2 className="edit-account-title titles">Profile</h2>
                    <div className="edit-account-container">
                        <div className="back-link">
                            <FaLongArrowAltLeft className="arrow-icon"/>
                            <Link to={`/account/${user.username}`}>Back to account</Link>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                        <div className="edit-email-container">
                            {!updateEmailSuccess ?
                                <EmailForm onSubmit={editEmail}/>
                                : <p>Email updated!</p>
                            }

                        </div>
                        {error && <p>{error.message}</p>}
                        <div className="edit-password-container">
                            {!updatePasswordSuccess ?
                                <PasswordForm onSubmit={editPassword} />
                               : <p>Password updated!</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditAccount;