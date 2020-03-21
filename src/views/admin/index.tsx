import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.scss";

// assets
import logo from "../../assets/logo/logo.png";
import iconEye from "../../assets/icons/eye.png";
import iconAdd from "../../assets/icons/add.png";

function Admin() {
  return (
    <div className="admin">
      <header className="admin__header">
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

      <div className="admin__container">
        <div className="admin__homepage">
          <div className="homepage__container">
            <Link to="/admin/rooms" className="homepage__link">
              <div className="homepage__link-container">
                <img src={iconAdd} alt="logo" />
                <span>
                  Ajouter
                  <br />
                  une room
                </span>
              </div>
            </Link>
            <Link to="/admin/rooms" className="homepage__link">
              <div className="homepage__link-container">
                <img src={iconEye} alt="logo" />
                <span>
                  Voir
                  <br />
                  les rooms
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
