import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../views/home";
import Admin from "../views/admin";

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/admin" component={Admin}></Route>
    </Switch>
  );
};

export default Routes;
