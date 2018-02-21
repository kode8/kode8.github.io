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
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';

/* Layouts */
import Layout from 'Components/Layout/Default';

console.log(process.env.NODE_ENV);

const appRoot = (process.env.NODE_ENV === 'production') ? '/dist' : '/';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      navItems : null,
      navLoaded: false
    }

    this.showLoader = this.showLoader.bind(this);
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

  showLoader(bool) {
    this.setState(() => {
      return {
        pageLoading: bool
      }
    });
  }

  render() {
    console.log(appRoot);
    return(
      <Router history={History} basename={appRoot}>
        <div className="container" >
          <Header>
            <SlideDown in={ this.state.navLoaded } timeout={{enter: 300}}>
              <Nav classNamePrefix="primary" navItems={this.state.navItems} showLoader={this.pageLoading}></Nav>
            </SlideDown>
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
            {this.state.pageLoading &&
              <Loader></Loader>      
            }
          </main>
        </div>
      </Router>
    );
  }
};

export default App;