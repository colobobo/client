import React, { FunctionComponent } from "react";
import "./index.scss";

interface Props {
  userId: number;
}

const Client: FunctionComponent<Props> = ({ userId }) => {
  return <div className="client">User {userId}</div>;
};

export default Client;
