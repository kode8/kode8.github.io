import React from 'react'
import CreateReactClass from 'create-react-class'
import Footer from 'Components/Footer/Footer'
import Nav from 'Components/Nav/Nav'

/* Helpers */
import { SlideDown, FadeIn } from 'Helpers/AnimateApi'

/* Pages */
import Home from 'Containers/Home';
import Experience from 'Containers/Experience';
import History from 'Containers/History';
import Work from 'Containers/Work';
import Contact from 'Containers/Contact';

const Pages = {
  Home: Home,
  Experience: Experience,
  History: History,
  Work: Work,
  Contact: Contact
}

const Layout = (props) => {
  let PageContent = Pages[props.container]; 
  return (
    <div>
      { /* Render the page } */ }
      <PageContent showLoader={ props.showLoader } />

      { /* We always require the footer to fade in after content load, this why we dump it here as oppoed to main app template } */ }
      <FadeIn in={ !props.pageLoading }>
        <Footer> 
          <hr />
          <Nav classNamePrefix="secondary" navItems={ props.navItems } showLoader={ props.showLoader } />
        </Footer>
      </FadeIn> 
    </div>
  )
}

export default Layout; 