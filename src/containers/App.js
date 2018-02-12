import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Elements */
import Loader from 'Elements/Loader';

/* Components */
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
      bgColor: 'white'
    }
  }

  changeBackground() {
    // return props.resetUser(this.props.id);
  }

  render() {
    const bgStyle = {
      backgroundColor : this.state.bgColor
    }
    return(
      <Router>
        <div className="container" style={bgStyle} >
          <Header></Header>
          <Loader></Loader>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/experience" component={Experience} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/portfolio" component={Portfolio} /> 
            <Route exact path="/contact" component={Contact} /> 
            <Route
              render={function() {
                return <p>Not found</p>; 
              }}
            />
          </Switch> 
          <Footer></Footer>
        </div>
      </Router>
    );
  }
};

export default App;
