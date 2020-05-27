import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

// assets
import logo from "../../../assets/logo/logo-simple.png";

const AdminHeader: FC = () => {
  return (
    <header className="header">
      <Link to="/admin" className="header__link home">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/admin/groups" className="header__link">
        Liste des groupes
      </Link>
      {/*       <Link to="/admin/sockets-playground" className="header__link">
        Sockets playground
      </Link> */}
    </header>
  );
};

export default AdminHeader;
