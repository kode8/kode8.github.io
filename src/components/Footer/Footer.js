import React from 'react';
import Nav from 'Components/Nav/Nav';
import classNames from 'classnames';

import './footer.scss';

const Footer = (props) => {
  const footerClass = classNames({
    footer: true,
    'footer--hidden': props.hideFooter,
  });

  return (
    <footer className={footerClass}>
      {props.children}
    </footer>
  );
};

export default Footer;
