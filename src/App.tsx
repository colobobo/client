import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketTest from "./components/SocketTest";
import CounterTest from "./components/CounterTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SocketTest />
        <CounterTest />
      </header>
    </div>
  );
}

export default App;
