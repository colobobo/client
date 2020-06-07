import React, { FC } from "react";
import { Route, Switch, MemoryRouter } from "react-router-dom";

//style
import "./index.scss";

// views
import Landing from "./landing";
import Room from "./room";
import Join from "./join";
import Game from "./game";
import About from "./about";

interface Props {}

const Client: FC<Props> = () => {
  // return

  return (
    <div className="client">
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={Game} />
          <Route path="/room/:roomId" component={Room} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default Client;
