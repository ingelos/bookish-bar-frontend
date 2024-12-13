import "./Navigation.css";
import {Link} from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";
import Button from "../button/Button.jsx";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import UserIcon from "../../assets/icons/user-circle.svg";
import NavigationLink from "../navigationLink/NavigationLink.jsx";

function Navigation() {
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <nav>
            <div className="nav-container">
                <ul className='navigation-links'>
                    <NavigationLink navToPage="/" navTitle="Home" customClass="nav-menu-link"/>
                    <NavigationLink navToPage="/my-books" navTitle="MyBooks" customClass="nav-menu-link"/>
                    <NavigationLink navToPage="/subjects" navTitle="Browse" customClass="nav-menu-link"/>
                </ul>
                <SearchBar/>
                <div>
                    {isAuth ?
                        <div className='user-container'>
                            <Button
                                buttonType='button'
                                className='log-link'
                                onClick={logout}
                                buttonText="Logout"
                            />
                            <Link to={'/profile'}>
                                <div className='user-profile-container'>
                                    {/*<img*/}
                                    {/*    src={ProfilePicture || UserIcon}*/}
                                    {/*    id='user-icon-profile'*/}
                                    {/*    alt='user-icon'/>*/}
                                </div>
                            </Link>
                        </div>
                        :
                        <div className='user-container'>
                            <Link to={"/login"} className="log-link">
                                Login
                            </Link>
                            <img src={UserIcon} id='user-icon' alt='user-icon'/>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navigation;