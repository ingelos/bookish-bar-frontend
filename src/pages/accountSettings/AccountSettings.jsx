import "./AccountSettings.css";
import AuthContext from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";
import PasswordForm from "../../components/passwordForm/PasswordForm.jsx";
import axios from "axios";
import EmailForm from "../../components/editUserDetailsForm/EditUserDetailsForm.jsx";
import Button from "../../components/button/Button.jsx";
import EditUserDetailsForm from "../../components/editUserDetailsForm/EditUserDetailsForm.jsx";


function AccountSettings() {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [editError, setEditError]= useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(null);
    const [updateEmailSuccess, setUpdateEmailSuccess] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const token = localStorage.getItem('token');

    async function editPassword(formData) {
        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.id}/password`, {
                currentPassword: formData.currentPassword,
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
            if (error.response && error.response.status === 400) {
                setErrorMessage("Invalid current password");
            }
            console.error('Error updating password', error);
            setError(true);
        }
    }

    async function editUserDetails(formData) {
        setEditError(null);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.patch(`http://localhost:8080/users/${user.id}/update`, {
                username: formData.username,
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
            setEditError(true);
        }
    }

    async function handleDeleteAccount() {
        try {
            await axios.delete(`http://localhost:8080/users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteSuccess(true);
        } catch (error) {
            console.error("Error deleting profile", error);
            setDeleteError(true);
        }
    }



    return (
        <section className="account-settings outer-container">
            <div className="account-settings inner-container">
                <div className="account-settings inner-content-container">
                    <h2 className="account-settings-title titles">Account Settings</h2>
                    <div className="account-settings-container">
                        <div className="user-info">
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                        {editError && <p>Error Editing Account Details.</p>}
                        <div className="edit-user-details-container">
                            {!updateEmailSuccess ?
                                <EditUserDetailsForm onSubmit={editUserDetails}/>
                                : <p className="success-message">Successfully updated your details!</p>
                            }

                        </div>
                        {error && <p>{error.message}</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                        <div className="edit-password-container">
                            {!updatePasswordSuccess ?
                                <PasswordForm onSubmit={editPassword}/>
                                : <p>Password updated!</p>
                            }
                        </div>
                        <div className="delete-container">
                                {deleteError &&
                                    <p className="error-message">Error Deleting Account.</p>}
                                {!deleteSuccess ?
                                    <Button buttonType="button"
                                            buttonText="Delete Account"
                                            className="button"
                                            onClick={handleDeleteAccount}
                                    />
                                    :
                                    <p>Account Deleted!</p>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountSettings;