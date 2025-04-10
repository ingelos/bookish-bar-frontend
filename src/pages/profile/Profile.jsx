import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Profile() {
    const {username} = useParams();

    const [profile, setProfile] = useState([]);
    // const [profilePhoto, setProfilePhoto] = useState(null);
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
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Error fetching profile", error);
                setError(true);
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
                    <h2 className="profile-title titles">{username}</h2>
                    <div className="profile-container">
                        {loading && <p>Loading...</p>}
                        {error && <p className="error-message">An unexpected error occurred</p>}
                        {/*<p id="username-profile"><strong>{username}</strong></p>*/}
                        {profile &&
                            <div>
                                <div className="photo-container">
                                    {/*{profilePhoto ? (*/}
                                    {/*    <img src={profilePhoto}*/}
                                    {/*         alt="profile-photo"*/}
                                    {/*         className="profile-photo"/>*/}
                                    {/*    ) : (*/}
                                    {/*        <img src={UserIcon} alt="user-icon"/>*/}
                                    {/*)}*/}
                                </div>
                                <p>{profile.firstname} {profile.lastname}</p>
                                <p>{profile.about}</p>
                                <p></p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Profile;