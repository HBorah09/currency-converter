import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const links = [
        { path: '/', label: 'Convert Currencies' },
        { path: '/history', label: 'Retrieve Historical Currency' },
        { path: '/rates', label: 'View Daily Currency Rates' },    
    ];

    return(
        <ul className='nav-link-container'>
            {links.map(link => (
                <li key={Math.random()}>
                    <NavLink to={link.path}>{link.label}</NavLink>
                </li>
            ))}
    </ul>
    )
}

export default NavBar;