import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Routes from "./routes";
import "./App.scss";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
