import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import GetContent from 'Api/GetContent';

/* Helpsers */
import { SlideDown, FadeIn } from 'Helpers/AnimateApi';

/* Elements */
import Loader from 'Elements/Loader';

/* Components */
import Nav from 'Components/Nav/Nav';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';

/* Pages */
import Home from 'Containers/Home';
import Experience from 'Containers/Experience';
import Services from 'Containers/Services';
import Portfolio from 'Containers/Portfolio';
import Contact from 'Containers/Contact';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      navItems : null
    }

    this.pageLoading = this.pageLoading.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }

  componentDidMount() {
    this.getNavItems();
  }

  /* Get Nav items from API */
  getNavItems() {

    if(this.state.navItems === null) {

      GetContent.getEntries('navigation').then((results) => {

        let items = results.items,
            navItems = [];

        items.map((item, index)=> {
            navItems.push({
              slug: item.fields.slug,
              title: item.fields.title,
              order: item.fields.order,
            })
        })

        let orderedItems = navItems.sort(function(a, b) {
          return a['order'] - b['order'];
        });

        this.setState(()=>{
          return {
            navItems : orderedItems
          }
        });

      });
    }
  }

  pageLoading(bool) {
    this.setState(() => {
      return {
        pageLoading: bool
      }
    });
  }

  render() {
    return(
      <Router>
        <div className="container" >
          <Header>
            <SlideDown in={ !this.state.pageLoading }>
              <Nav classNamePrefix="primary" navItems={this.state.navItems} pageLoading={ this.pageLoading }></Nav>
            </SlideDown>
          </Header>
          <main>
            {this.state.pageLoading &&
              <Loader></Loader>      
            }
          </main>
          <Switch>
            <Route exact path="/" render={()=><Home pageLoading={ this.pageLoading } />} />
            <Route path="/experience" render={()=><Experience pageLoading={ this.pageLoading } />} />
            <Route path="/services" render={()=><Services pageLoading={ this.pageLoading } />} />
            <Route path="/portfolio" render={()=><Porfolio pageLoading={ this.pageLoading } />} />
            <Route path="/contact" render={()=><Contact pageLoading={ this.pageLoading } />} />
            <Route
              render={function() {
                return <p>Not found</p>; 
              }}
            />
          </Switch> 
         
          <Footer>
            <FadeIn in={ !this.state.pageLoading }>
              <hr />
              <Nav classNamePrefix="secondary" navItems={this.state.navItems} pageLoading={ this.pageLoading } />
            </FadeIn>
          </Footer>
          
        </div>
      </Router>
    );
  }
};

export default App;
