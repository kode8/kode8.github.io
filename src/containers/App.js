const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

// Import all our components here

class App extends React.Component  {
    /* <Route is a component that we are passing 2 props to. Simple */
    render() {
        return ( 
            <Router>
                <div className="container">
                    <Nav />
                    Hello
                    <Switch>
                        <Route exact path='/' component={Home} /> 
                        <Route exact path='/battle' component={Battle} /> 
                        <Route exact path='/battle/results' component={Results} /> 
                        <Route path='/popular' component={Popular} /> 
                        <Route render={function() {
                            return <p>Not found</p>
                        }} /> 
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;