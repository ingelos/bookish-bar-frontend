import "./DropdownMenu.css";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function DropdownMenu({logout, UserIcon}) {
    const {user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='user-container'>
            <div className='dropdown'>
                <button
                    className='dropdown-button'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={UserIcon} id='user-icon' alt='user-icon'/>
                </button>

                {isOpen && (
                    <div className="dropdown-content">
                        <Link to={`/profiles/${user.username}`} id="profile-link">Profile</Link>
                        <Link to={`/users/${user.username}/account-settings`} id="account-settings-link">Account Settings</Link>
                        <button className='log-link' onClick={logout}>
                            Sign out
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default DropdownMenu;