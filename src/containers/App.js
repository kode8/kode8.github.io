import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import GetContent from 'Api/GetContent';
import History from 'Helpers/History';

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

/* Layouts */
import Layout from 'Components/Layout/Default';

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
    this.getNavItems();
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

  /* Route has changed */
  routeChanged() {
    this.state.pageLoading = true;
    this.setState({
      menuExpanded: false
    })
  }

  /* Get Nav items from API */
  getNavItems() {

    if(this.state.navItems === null) {


      GetContent.getEntries({
        'content_type': 'navigation'
      }).then((results) => {

        let items = results.items,
            navItems = [];

        items.map((item, index)=> {
            const { slug, title, order } = item.fields;
            navItems.push({
              slug: slug,
              title: title,
              order: order,
            })
        })

        let orderedItems = navItems.sort(function(a, b) {
          return a['order'] - b['order'];
        });

        this.setState(()=>{
          return {
            navItems : orderedItems,
            navLoaded: true
          }
        });

      });
    }
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
      <div>
      <Router history={History}>
        <Container menuExpanded={this.state.menuExpanded} >
          <Header>
            {/* <SlideDown in={ this.state.navLoaded } timeout={{enter: 300}}> */}
              <Nav classNamePrefix="primary" navItems={this.state.navItems} >
                <NavButton menuExpanded={this.state.menuExpanded} onClick={this.toggleMenu} />
              </Nav>
            {/* </SlideDown> */}
          </Header>
          <main>
            <Switch>  
              <Route exact path="/" render={ ()=>
                <Layout container='Home' navItems={this.state.navItems} pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
              } />
              <Route exact path="/experience" render={ ()=>
                <Layout container='Experience' navItems={this.state.navItems} pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
              } />
              <Route exact path="/history" render={ ()=>
                <Layout container='History' navItems={this.state.navItems} pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
              } />
               <Route exact path="/work" render={ ()=>
                <Layout container='Work' navItems={this.state.navItems} pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
              } />
               <Route exact path="/contact" render={ ()=>
                <Layout container='Contact' navItems={this.state.navItems} pageLoading={this.state.pageLoading} showLoader={this.showLoader} />
              } />
              <Route
                render={function() {
                  return <p>Not found</p>;  
                }}
              />
            </Switch> 
          </main>
        </Container>
      </Router>
        {this.state.pageLoading &&
          <Loader></Loader>      
        }
      </div>
    );
  }
};

export default App;