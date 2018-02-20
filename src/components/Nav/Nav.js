import React from 'react';
import { NavLink, withRouter} from 'react-router-dom'; // Nav link adds some extra properties ie activeClassName

import './nav.scss';

const Nav = (props) => {

    let navItems = (props.navItems !== null) ? props.navItems : [];

    const navContainer = `${props.classNamePrefix}-nav`,
          navLink = `${navContainer}__item-link`,
          navLinkActive = `${navLink}--active`;

    const { match, location, history } = props;

  //  console.log(props);

    return (
        <ul className={navContainer} >
        { 
            navItems.map( (value, index) => {
                return (
                    <li key={ index }>
                        <NavLink 
                            exact
                            to={value.slug} 
                            className={navLink} 
                            activeClassName={navLinkActive}
                            >
                            <span>{value.title}</span>
                        </NavLink>
                    </li>
                );
            })
        }
        </ul>
    )
}

const NavWithRouter = withRouter(Nav)

export default NavWithRouter;