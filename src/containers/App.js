import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import GetContent from 'Api/GetContent';
import History from 'Helpers/History';

/* Pages */
import Home from 'Containers/Home';
import Experience from 'Containers/Experience';
import HistoryP from 'Containers/History';
import Work from 'Containers/Work';
import Contact from 'Containers/Contact';

/* Helpers */
import { SlideDown, FadeIn } from 'Helpers/AnimateApi';

/* Elements */
import Loader from 'Elements/Loader';

/* Components */
import Nav from 'Components/Nav/Nav';
import NavButton from 'Components/NavButton/NavButton';
import Container from 'Components/Container/Container';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      navItems : null,
      navLoaded: false,
      menuExpanded: false
    }

    this.showLoader = this.showLoader.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.routeListener();
  }

  /* Route change listener */
  routeListener() {
    let prevPathname = null;
    const HistoryListen = History.listen((location, action) => {
      let { pathname, state } = location;
      
      if(prevPathname !== pathname) {
        this.routeChanged();
      } 

      prevPathname = pathname;
    });
  }

  routeChanged() {
    this.state.pageLoading = true;
    this.setState({
      menuExpanded: false,
      hideFooter: true
    })
  }

  toggleMenu() {
    const currentState = this.state.menuExpanded;
    this.setState({ menuExpanded: !currentState });
  }

  showLoader(bool) {
    this.setState(() => {
      return {
        pageLoading: bool
      }
    });
  }
  
  render() {

    return(
        <Router history={History}>
          <div>

            <Header>
              <Nav classNamePrefix="primary">
                <NavButton onClick={this.toggleMenu} />
              </Nav>
            </Header>

            <Container menuExpanded={this.state.menuExpanded} >
              <Switch>  
                <Route exact path="/" render={ ()=>
                  <Home pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
                } />
                  <Route exact path="/experience" render={ ()=>
                  <Experience pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
                } />
                  <Route exact path="/work" render={ ()=>
                  <Work pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
                } />
                  <Route exact path="/history" render={ ()=>
                  <HistoryP pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
                } />
                  <Route exact path="/contact" render={ ()=>
                  <Contact pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
                } />
                <Route
                  render={function() {
                    return <p>Not found</p>;  
                  }}
                />
              </Switch> 
            </Container>

            <Footer hideFooter={this.state.pageLoading}   >
              <Nav classNamePrefix="secondary" />
            </Footer>

            {this.state.pageLoading &&
              <Loader />
            }
          </div>
        </Router>
    );
  }
};

export default App;