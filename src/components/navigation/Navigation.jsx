import "./Navigation.css";
import {Link, useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import UserIcon from "../../assets/icons/user-circle.svg";
import NavigationLink from "../navigationLink/NavigationLink.jsx";
import MagnifyingGlassIcon from "../../assets/icons/magnifying-glass.svg";

function Navigation() {
    const {isAuth, logout} = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    function handleSearchSubmit(event) {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <ul className='navigation-links'>
                    <NavigationLink navToPage="/" navTitle="Home" customClass="nav-menu-link"/>
                    <NavigationLink navToPage="/my-books" navTitle="MyBooks" customClass="nav-menu-link"/>
                    <NavigationLink navToPage="/subjects" navTitle="Browse" customClass="nav-menu-link"/>
                </ul>
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input type="search"
                               className="search-bar-input"
                               placeholder="Title or Author..."
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               />
                        <button type="submit" className="search-bar-button">
                            <img src={MagnifyingGlassIcon} alt='' className='magnifying-glass-icon'/>
                        </button>
                    </form>
                {/*<SearchBar onFocus={handleNavigationToSearchPage}/>*/}
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