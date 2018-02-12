import React from 'react';
import Nav from 'Components/Nav/Nav';

const Footer = (props) => {
    return (
        <footer>
            <Nav classNamePrefix="secondary"></Nav>
            {props.children}
        </footer>
    );
}

export default Footer;