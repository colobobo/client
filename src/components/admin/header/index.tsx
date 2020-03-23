import React, { FC } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.scss";

// assets
import logo from "../../../assets/logo/logo.png";

const AdminHeader: FC = () => {
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
    </header>
  );
};

export default AdminHeader;
