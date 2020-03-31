import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.scss";

// views
import Landing from "../../views/app/landing";
import Room from "../../views/app/room";
import Join from "../../views/app/join";
import Game from "../../views/app/game";

const Client: FC = () => {
  // return

  return (
    <div className="client">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={Game} />
          <Route path="/:roomId" component={Room} />
        </Switch>
      </Router>
    </div>
  );
};

export default Client;
