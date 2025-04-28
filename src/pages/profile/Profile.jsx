import "./Profile.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Profile() {
    const {username} = useParams();
    const [profile, setProfile] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        async function fetchProfile() {
            setError(null);
            setLoading(true);

            try {
                const profileResponse = await axios.get(`http://localhost:8080/profiles/${username}`,  {
                    signal: controller.signal,
                });
                setProfile(profileResponse.data);

                try {
                    const photoResponse = await axios.get(`http://localhost:8080/profiles/${username}/photo`, {
                        responseType: 'blob',
                        signal: controller.signal
                    });
                    const photoUrl = URL.createObjectURL(photoResponse.data);
                    if (photoUrl != null) {
                        setProfilePhoto(photoUrl);
                        // console.log(photoUrl);
                    }

                }  catch (photoError) {
                    if (photoError.response && photoError.response.status === 404) {
                        setProfilePhoto(null);
                    } else {
                        console.error("Error fetching photo:", photoError);
                        setError(true);
                        setProfilePhoto(null);
                    }
                }

            } catch (error) {
                if (axios.isCancel(error)) return;
                if (error.response && error.response.status === 404) {
                    setProfile(null);
                } else if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.message;
                    setError(errorMessage);
                } else {
                    console.error("Error fetching profile", error);
                    setError(true);
                }
            } finally{
                setLoading(false);
            }
        }

        fetchProfile();

        return function cleanup() {
            controller.abort();
        }

    }, [username]);

    return (
        <section className="profile-page outer-container">
            <div className="profile-page inner-container">
                <div className="profile inner-content-container">
                    {loading && <p>Loading profile...</p>}
                    {error && <p>{error}</p>}
                        {profile ?
                            <div className="profile-container">
                                <div className="profile-info-container">
                                    <h3 className="profile-title titles">{username}</h3>
                                    <p id="profile-name">{profile.firstname ? profile.firstname : ""} {profile.lastname ? profile.lastname : ""}</p>
                                    <p>{profile.about ? profile.about : ""}</p>
                                </div>
                                <div className="photo-container">
                                    {profilePhoto && (
                                        <img src={profilePhoto}
                                             alt="profile-photo"
                                             className="profile-photo"/>
                                    )}
                                </div>
                            </div>
                            :
                            <h3>{username} has no profile</h3>
                        }
                </div>
            </div>
        </section>

    )
}

export default Profile;