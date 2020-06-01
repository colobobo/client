import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

// assets
import logo from "../../../assets/logo/logo-simple.png";

const AdminHeader: FC = () => {
  return (
    <header className="admin-header">
      <Link to="/admin" className="admin-header__link home">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/admin/groups" className="admin-header__link">
        Liste des groupes
      </Link>
    </header>
  );
};

export default AdminHeader;
