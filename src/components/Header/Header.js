import React from 'react';
import Nav from 'Components/Nav/Nav';

const Header = (props) => {
    return (
        <header>
            <Nav classNamePrefix="primary"></Nav>
            {props.children}
        </header>
    );
}

export default Header;