import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Rooms from './components/rooms';
import Room from './components/room';
import Home from './components/home';

function Admin() {
    return (
        <div className="admin">
            <header className="admin__nav">
            <Router>
                <Link to="/admin">HOME</Link>
                <Link to="/admin/rooms">ROOMS</Link>
                <Link to="/admin/room">ROOM 1</Link>

                <Switch>
                    <Route path="/admin" exact component={Home} />
                    <Route path="/admin/rooms" component={Rooms} />
                    <Route path="/admin/room" component={Room} />
                </Switch>
            </Router>
            </header>
        </div>
    )
}

export default Admin;