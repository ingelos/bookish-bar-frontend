import "./ProfileSettings.css";
import ProfileForm from "../../components/profileForm/ProfileForm.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";


function ProfileSettings() {
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const [initialData, setInitialData] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deletePhotoSuccess, setDeletePhotoSuccess] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {


        async function fetchProfile() {
                try {
                    const profileResponse = await axios.get(`http://localhost:8080/users/${user.id}/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    setInitialData(profileResponse.data);

                    try {
                        const photoResponse = await axios.get(`http://localhost:8080/profiles/${user.username}/photo`, {
                            responseType: 'blob',
                        });

                        const photoUrl = URL.createObjectURL(photoResponse.data);
                        if (photoUrl != null) {
                            setProfilePhotoUrl(photoUrl);
                        }
                    } catch (photoError) {
                        if (photoError.response && photoError.response.status === 404) {
                            setProfilePhotoUrl(null);
                        } else {
                            console.error("Error fetching photo:", photoError);
                            setProfilePhotoUrl(null);
                        }
                    }
                } catch (error) {
                    setFetchError(error);
                }
            }

            fetchProfile();
        }, [user.id, user.username]
    );


    function handleImageChange(e) {
        const file = e.target.files[0];

        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    async function handleUploadPhoto(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const {data} = await axios.post(`http://localhost:8080/users/${user.id}/profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUploadSuccess(true);
            setPreviewUrl(null);
            console.log("Photo uploaded successfully!", data);
        } catch (error) {
            console.log("Error uploading photo", error);
        }
    }


    async function editProfile(profileData) {
        setHasSubmitted(true);
        try {
            if (initialData) {
                const {data} = await axios.put(`http://localhost:8080/users/${user.id}/profile`, profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("Profile updated:", data);
                setSavedSuccess(true);
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

    async function handleDeletePhoto() {
        try {
            await axios.delete(`http://localhost:8080/users/${user.id}/profile/photo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeletePhotoSuccess(true);
        } catch (error) {
            console.error("Error deleting photo", error);
        }
    }


    return (
        <section className="profile-settings-page outer-container">
            <div className="profile-settings-page inner-container">
                <div className="profile-settings inner-content-container">
                    <h2 className="profile-settings-title titles">Profile Settings</h2>
                    <div className="profile-settings-container">
                        <div className="profile-form-container">
                            {!savedSuccess ?
                                <div>
                                    {initialData && fetchError &&
                                        <p className="error-message">Error fetching profile</p>}
                                    {hasSubmitted && error &&
                                        <p className="error-message">Something went wrong submitting the form,
                                            please try again.</p>}
                                    <ProfileForm
                                        onSubmit={editProfile}
                                        initialData={initialData}
                                        error={error}
                                    />
                                </div>
                                :
                                <p className="success-message">Profile Saved!</p>
                            }
                        </div>
                        <div className="profile-photo-container">
                            {!uploadSuccess ?
                                <form onSubmit={handleUploadPhoto}>
                                    <div className="preview-container">
                                        {previewUrl &&
                                            <img src={previewUrl} alt="Example of chosen image"
                                                 className="profile-photo"/>
                                        }
                                        {!previewUrl && !deletePhotoSuccess && profilePhotoUrl &&
                                            <img src={profilePhotoUrl}
                                                 className="profile-photo" alt="Profile photo"/>
                                        }
                                    </div>
                                    <label htmlFor="profile-photo">
                                        Choose image:
                                        <input type="file" name="file" id="profile-photo"
                                               onChange={handleImageChange}/>
                                    </label>
                                    <button type="submit" className="button">Upload photo</button>
                                </form>
                                :
                                <p className="success-message">Successfully added a photo to your profile!</p>
                            }
                        </div>
                    </div>
                    <div className="delete-container photo">
                        <div>
                            {deleteError &&
                                <p className="error-message">Error deleting profile, please try again.</p>}
                            {!deleteSuccess ?
                                <Button buttonType="button"
                                        buttonText="Delete Profile"
                                        className="button"
                                        onClick={handleDeleteProfile}
                                />
                                :
                                <p className="success-message">Profile Deleted!</p>
                            }
                        </div>
                        <div>
                            {deleteError &&
                                <p className="error-message">Error deleting photo, please try again.</p>}
                            {!deletePhotoSuccess ?
                                <Button buttonType="button"
                                        buttonText="Delete Photo"
                                        className="button"
                                        onClick={handleDeletePhoto}
                                />
                                :
                                <p className="success-message">Photo Deleted!</p>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProfileSettings;