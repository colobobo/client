import React, { FC } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.scss";

const Rooms: FC = () => {
  return (
    <div className="rooms">
      <div className="rooms__container">
        <h1 className="rooms__title">Les rooms :</h1>
        <ul className="rooms__list">
          <li className="rooms__item">
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
