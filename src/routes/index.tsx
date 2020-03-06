import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from '../views/home';
import Admin from '../views/admin';
import Rooms from '../views/rooms';
import Room from '../views/room';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/admin" exact component={Admin}></Route>
            <Route path="/admin/rooms" component={Rooms}></Route>
            <Route path="/admin/room" component={Room}></Route>
        </Switch>
    )
}

export default Routes;