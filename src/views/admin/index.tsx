import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.scss";

// components
import AdminHeader from "../../components/admin/header";
import AdminHome from "../adminHome";

// routes
import Rooms from "../rooms";
import Room from "../room";

const Admin: FunctionComponent = () => {
  return (
    <div className="admin">
      <AdminHeader />

      <div className="admin__container">
        <Route path="/admin" exact component={AdminHome}></Route>
        <Route path="/admin/rooms" component={Rooms}></Route>
        <Route path="/admin/room" component={Room}></Route>
      </div>
    </div>
  );
};

export default Admin;
