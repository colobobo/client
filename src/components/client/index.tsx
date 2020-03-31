import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  MemoryRouter
} from "react-router-dom";
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
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={Game} />
          <Route path="/:roomId" component={Room} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default Client;
