import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';

function Admin() {
    return (
        <div className="admin">
            <header className="admin__header">
                <Link to="/admin/rooms">Liste des rooms</Link>
                <Link to="/admin/room">Room 1</Link>
            </header>
        </div>
    )
}

export default Admin;