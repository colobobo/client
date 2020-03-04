import React,{ Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Rooms from './components/rooms/Rooms';
import Home from './components/home/Home';

class Admin extends Component {
    render() {
        return (
          <div className="admin">
              <header className="admin__nav">
                <Router>
                    <Link to="/admin">HOME</Link>
                    <Link to="/admin/rooms">ROOMS</Link>

                    <Switch>
                        <Route path="/admin" exact component={Home} />
                        <Route path="/admin/rooms" component={Rooms} />
                    </Switch>
                </Router>
              </header>
          </div>
        )
    }
}

export default Admin;