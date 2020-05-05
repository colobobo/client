import React, { FC, useEffect } from "react";
import { Route } from "react-router-dom";
import "./index.scss";

import { useDispatch } from "react-redux";
import { actions } from "../../redux";

// components
import AdminHeader from "../../components/admin/header";

// routes
import Home from "./home";
import Rooms from "./rooms";
import Room from "./room";
import SocketsPlayground from "../../components/SocketsPlayground";

const Admin: FC = () => {
  // store

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.admin.activate());
  }, [dispatch]);

  return (
    <div className="admin">
      <AdminHeader />

      <div className="admin__container">
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/rooms" component={Rooms} />
        <Route path="/admin/room/:roomId" component={Room} />
        <Route path="/admin/sockets-playground" component={SocketsPlayground} />
      </div>
    </div>
  );
};

export default Admin;
