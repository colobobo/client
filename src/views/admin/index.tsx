import React, { FC } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

// components
import AdminHeader from "../../components/admin/header";

// routes
import Home from "./home";
import Rooms from "./rooms";
import Room from "./room";
import SocketsPlayground from "../../components/SocketsPlayground";

const Admin: FC = () => {
  return (
    <div className="admin">
      <AdminHeader />

      <div className="admin__container">
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/rooms" component={Rooms} />
        <Route path="/admin/room" component={Room} />
        <Route path="/admin/sockets-playground" component={SocketsPlayground} />
      </div>
    </div>
  );
};

export default Admin;
