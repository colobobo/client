import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Routes from './routes';
import './App.scss';

function App() {
    return (
        <Router>
            <Routes />
        </Router>
    )
}

export default App;
