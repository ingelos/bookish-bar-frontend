import ProfileForm from "../../components/profileForm/ProfileForm.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

function EditProfile() {
    const {user} = useContext(AuthContext);
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [savedSuccess, setSavedSuccess] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const {data} = await axios.get(`/profiles/${user.username}`);
                setInitialData(data);
            } catch (error) {
                setError(error);
            }
        }
        fetchProfile();
    }, [user.username]);

    async function editProfile(data) {
        try {
            if (initialData?.username) {
                await axios.put(`http://localhost:8080/profiles/${user.username}/edit`, data);
            } else {
                await axios.post(`http://localhost:8080/profiles/${user.username}`, data);
            }
            setSavedSuccess(true);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    }


    return (
        <section className="edit-profile-page outer-container">
            <div className="edit-profile-page inner-container">
                <div className="edit-profile inner-content-container">
                    <h2 className="edit-profile-title titles">Profile</h2>
                    <div className="edit-profile-container">
                        {!savedSuccess ?
                            <ProfileForm
                                onSubmit={editProfile}
                                initialData={initialData}
                                error={error}/>
                            :
                            <p>Profile saved!</p>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProfile;