import "./Navigation.css";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import UserIcon from "../../assets/icons/user-circle-2.svg";
import NavigationLink from "../navigationLink/NavigationLink.jsx";
import MagnifyingGlassIcon from "../../assets/icons/magnifying-glass.svg";
import DropdownMenu from "../dropdownMenu/DropdownMenu.jsx";

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
                    <NavigationLink navToPage="/subjects" navTitle="Browse" customClass="nav-menu-link"/>
                    <NavigationLink navToPage="/my-books" navTitle="MyBooks" customClass="nav-menu-link"/>
                </ul>
                <div className="nav-inner-container-right">
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input type="search"
                               className="search-bar-input"
                               placeholder="Search by title or author..."
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-bar-button">
                            <img src={MagnifyingGlassIcon} alt='magnifying-glass' className='magnifying-glass-icon'/>
                        </button>
                    </form>
                    <div>
                        {isAuth ?
                            <DropdownMenu
                                UserIcon={UserIcon}
                                logout={logout}
                            />
                            :
                            <div className='user-container'>
                                <Link to={"/login"}
                                      id="login-link">
                                    Log In
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;