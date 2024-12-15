import {NavLink} from "react-router-dom";

function NavigationLink({ navToPage, navTitle, customClass }) {
    return (
        <li className={`nav-link ${customClass}`}>
            <NavLink
                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                to={navToPage}>
                {navTitle}
            </NavLink>
        </li>
    )
}

export default NavigationLink;