import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.scss";

// assets
import iconEye from "../../assets/icons/eye.png";
import iconAdd from "../../assets/icons/add.png";

const AdminHome: FunctionComponent = () => {
  return (
    <div className="admin-homepage">
      <div className="admin-homepage__container">
        <Link to="/admin/rooms" className="admin-homepage__link">
          <div className="admin-homepage__link-container">
            <img src={iconAdd} alt="logo" />
            <span>
              Ajouter
              <br />
              une room
            </span>
          </div>
        </Link>
        <Link to="/admin/rooms" className="admin-homepage__link">
          <div className="admin-homepage__link-container">
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
  );
};

export default AdminHome;
