import React from 'react';

class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-french';
    }

    render() {
        return(
            <p>Contact</p>
        )
    }
}

export default Contact;