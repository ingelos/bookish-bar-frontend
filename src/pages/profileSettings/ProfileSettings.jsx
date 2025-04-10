import "./ProfileSettings.css";
import ProfileForm from "../../components/profileForm/ProfileForm.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";


function ProfileSettings() {
    const {user} = useContext(AuthContext);
    // const {username} = useParams();
    const [initialData, setInitialData] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        async function fetchProfile() {
            try {
                const {data} = await axios.get(`http://localhost:8080/users/${user.id}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setInitialData(data);
            } catch (error) {
                setFetchError(error);
            }
        }

        fetchProfile();
    }, [user.id]);


    async function editProfile(profileData) {
        setHasSubmitted(true);
        try {
            if (initialData) {
                // console.log("Trying to send form with data:", profileData);
                // console.log("User id:", user.id);
                // console.log("Token:", token);
                const {data} = await axios.put(`http://localhost:8080/users/${user.id}/profile`, profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("Profile updated:", data)
                setError(null);
            } else {
                const {data} = await axios.post(`http://localhost:8080/users/${user.id}/profile`, profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Profile created:', data);
                setSavedSuccess(true);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    }

    async function handleDeleteProfile() {
        try {
            console.log("trying to delete profile");
            await axios.delete(`http://localhost:8080/users/${user.id}/profile`, {
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
        <section className="edit-profile-page outer-container">
            <div className="edit-profile-page inner-container">
                <div className="edit-profile inner-content-container">
                    <h2 className="edit-profile-title titles">Profile Settings</h2>
                    <div className="edit-profile-container">
                        {!savedSuccess ?
                            <div>
                                {initialData && fetchError && <p className="error-message">Error fetching profile</p>}
                                {hasSubmitted && error &&
                                    <p className="error-message">Something went wrong submitting the form, please try again.</p>}
                                <ProfileForm
                                    onSubmit={editProfile}
                                    initialData={initialData}
                                    error={error}
                                />
                            </div>
                            // <ProfileForm
                            //     onSubmit={editProfile}
                            //     // initialData={initialData}
                            //     // error={error}
                            // />  }
                            :
                            <p>Profile Saved!</p>
                        }
                        <div className="delete-container">
                            {deleteError && <p className="error-message">Error deleting profile, please try again.</p>}
                            {!deleteSuccess ?
                                <Button buttonType="button"
                                        buttonText="Delete Profile"
                                        className="button"
                                        onClick={handleDeleteProfile}
                                />
                                :
                                <p>Profile Deleted!</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileSettings;