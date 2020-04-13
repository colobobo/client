import React, { FC, useEffect } from "react";
import { Route } from "react-router-dom";
import "./index.scss";

import { useDispatch } from "react-redux";
import { actions as AdminActions } from "../../redux/Admin";

// components
import AdminHeader from "../../components/admin/header";
import Home from "./home";

// routes
import Rooms from "./rooms";
import Room from "./room";

const Admin: FC = () => {
  // store

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AdminActions.activate());
  }, [dispatch]);

  return (
    <div className="admin">
      <AdminHeader />

      <div className="admin__container">
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/rooms" component={Rooms} />
        <Route path="/admin/room" component={Room} />
      </div>
    </div>
  );
};

export default Admin;
