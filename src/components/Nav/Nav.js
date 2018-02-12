import React from 'react';
import { NavLink } from 'react-router-dom'; // Nav link adds some extra properties ie activeClassName

import './nav.scss';

const Nav = (props) => {
    const items = [
        {url: '/', name: 'Me'}, 
        {url: '/experience', name: 'Experience'}, 
        {url: '/services', name: 'Services'}, 
        {url: '/portfolio', name: 'Portfolio'}, 
        {url: '/contact', name: 'Contact'}, 
    ];

    console.log(props);

    const navContainer = `${props.classNamePrefix}-nav`;
    const navLink = `${navContainer}__item-link`;
    const navLinkActive = `${navLink}--active`;

    return (
        <ul className={navContainer} >
        { 
            items.map( (value, index) => {
                return (
                    <li key={ index }>
                        <NavLink 
                            to={value.url} 
                            className={navLink} 
                            activeClassName={navLinkActive}>
                            <span>{ value.name }</span>
                        </NavLink>
                    </li>
                );
            })
        }
        </ul>
    )
}

export default Nav;