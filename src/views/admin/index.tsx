import React, { FC } from "react";
import { Route } from "react-router-dom";
import "./index.scss";

// components
import AdminHeader from "../../components/admin/Header";

// routes
import Home from "./home";
import Groups from "./groups";
import Group from "./group";
import SocketsPlayground from "../../components/SocketsPlayground";

const Admin: FC = () => {
  // store

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(actions.admin.activate());
  // }, [dispatch]);

  return (
    <div className="admin">
      <AdminHeader />

      <div className="admin__container">
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/groups" component={Groups} />
        <Route path="/admin/group/:groupId" component={Group} />
        <Route path="/admin/sockets-playground" component={SocketsPlayground} />
      </div>
    </div>
  );
};

export default Admin;
