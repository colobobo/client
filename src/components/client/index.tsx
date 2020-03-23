import React, { FC } from "react";
import "./index.scss";

interface Props {
  userId: number;
}

const Client: FC<Props> = ({ userId }) => {
  return <div className="client">User {userId}</div>;
};

export default Client;
