import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import Client from "../views/client";
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
