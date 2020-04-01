import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Rooms: FC = () => {
  return (
    <div className="admin-rooms">
      <div className="admin-rooms__container">
        <h1 className="admin-rooms__title">Les rooms :</h1>
        <ul className="admin-rooms__list">
          <li className="admin-rooms__item">
            <Link to="/admin/room" className="item__link">
              Room 1
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
