import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Admin from './admin';
import Home from './components/Home';

function App() {
    return (
        <div>
            <Router>
                <div>
                  <Link to={'/'}>Home</Link>
                  <Link to={'/admin'}>Admin</Link>
                  <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/admin' component={Admin} />
                  </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;
