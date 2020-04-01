import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Client from "../components/client";
import Admin from "../views/admin";

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Client}></Route>
      <Route path="/admin" component={Admin}></Route>
    </Switch>
  );
};

export default Routes;
