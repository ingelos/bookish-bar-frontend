import "./AccountSettings.css";
import AuthContext from "../../context/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import PasswordForm from "../../components/passwordForm/PasswordForm.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import ChangeUsernameForm from "../../components/changeUsernameForm/ChangeUsernameForm.jsx";
import ChangeEmailForm from "../../components/changeEmailForm/ChangeEmailForm.jsx";


function AccountSettings() {
    const {user, login} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [editError, setEditError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(null);
    const [updateEmailSuccess, setUpdateEmailSuccess] = useState(null);
    const [updateUsernameSuccess, setUpdateUsernameSuccess] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const token = localStorage.getItem('token');



    async function handleEditUsername(formData) {
        setEditError(null);
        const oldToken = localStorage.getItem('token');

        try {
            const response = await axios.put(`http://localhost:8080/users/${user.id}/change-username`, {
                username: formData.username,
                password: formData.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${oldToken}`,
                }
            });

            const {token: newToken} = response.data;

            localStorage.setItem('token', newToken);
            await login(newToken);

            setUpdateUsernameSuccess(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Invalid password");
            }
            console.error(error);
            setEditError(true);
        }
    }

    async function handleEditEmail(formData) {
        setEditError(null);
        const token = localStorage.getItem('token');

        try {
            const {data} = await axios.put(`http://localhost:8080/users/${user.id}/change-email`, {
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            setUpdateEmailSuccess(true);
            console.log(`Email successfully updated`, data);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Invalid password");
            }
            console.error(error);
            setEditError(true);
        }
    }

    async function editPassword(formData) {
        try {
            const {data} = await axios.put(`http://localhost:8080/users/${user.id}/change-password`, {
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
                        <div className="edit-username-container">
                            {!updateUsernameSuccess ?
                                <ChangeUsernameForm
                                    onSubmit={handleEditUsername}
                                />
                                : <p className="success-message">Successfully updated your Username!</p>
                            }

                        </div>
                        <div className="edit-email-container">
                            {!updateEmailSuccess ?
                                <ChangeEmailForm
                                    onSubmit={handleEditEmail}
                                />
                                : <p className="success-message">Successfully updated your Email!</p>
                            }

                        </div>
                        {error && <p>{error.message}</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                        <div className="edit-password-container">
                            {!updatePasswordSuccess ?
                                <PasswordForm
                                    onSubmit={editPassword}
                                />
                                : <p className="success-message">Successfully updated your Password!</p>
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
                                <p className="success-message">Account Deleted!</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountSettings;