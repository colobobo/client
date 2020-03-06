import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <header className="home__header">
                <Link to="/admin">Admin</Link>
            </header>
            <h1 className="home__title">Home</h1>
        </div>
    )
}

export default Home;