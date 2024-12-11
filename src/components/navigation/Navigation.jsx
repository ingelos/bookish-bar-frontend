import "./Navigation.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";
import Button from "../button/Button.jsx";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import UserIcon from "../../assets/icons/user-circle.svg";

function Navigation(){
    const navigate = useNavigate();
    const { isAuth, logout } = useContext(AuthContext);


    return (
        <nav>
            <div className="nav-container">
                <ul className='navigation-links'>
                    <li className='nav-link'>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/'>Home</NavLink>
                    </li>
                    <li className='nav-link'>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/my-books'>MyBooks</NavLink>
                    </li>
                    <li className='nav-link'>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/browse'>Browse</NavLink>
                    </li>
                </ul>
                <div className='nav-search-bar'>
                    <NavLink to='/search-results'>
                        <SearchBar/>
                    </NavLink>
                </div>
                <div>
                    {isAuth ?
                        <div className='user-container'>
                            <Button
                                buttonType='button'
                                className='log-link'
                                onClick={logout}
                            >
                                Logout
                            </Button>
                            <Link to={'/profile'}>
                                <div className='nav-profile-container'>
                                    {/*<img*/}
                                    {/*    src={ProfilePicture || UserIcon}*/}
                                    {/*    id='user-icon-profile'*/}
                                    {/*    alt='user-icon'/>*/}
                                </div>
                            </Link>
                        </div>
                        :
                        <div className='user-container'>
                            <Button
                                buttonType='button'
                                className='log-link'
                                onClick={() => navigate('./login')}
                            >
                                Login
                            </Button>
                            <img src={UserIcon} id='user-icon' alt='user-icon'/>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navigation;