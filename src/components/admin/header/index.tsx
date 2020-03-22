import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.scss";

// assets
import logo from "../../../assets/logo/logo.png";

const AdminHeader: FunctionComponent = () => {
  return (
    <header className="header">
      <Link to="/admin" className="header__link home">
        <img src={logo} alt="logo" />
        FastNotFat
      </Link>
      <Link to="/admin/rooms" className="header__link">
        Créer une room
      </Link>
      <Link to="/admin/rooms" className="header__link">
        Liste des rooms
      </Link>
      <Link to="/admin/room" className="header__link">
        Room 1
      </Link>
    </header>
  );
};

export default AdminHeader;
