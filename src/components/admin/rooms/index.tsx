import React, { FC } from "react";
import { Link } from "react-router-dom";

//config
import { rooms } from "../../../config/rooms";

//styles
import "./index.scss";

const Rooms: FC = () => {
  return (
    <div className="admin-rooms">
      <div className="admin-rooms__container">
        <h1 className="admin-rooms__title">Les rooms :</h1>
        <ul className="admin-rooms__list">
          {rooms.map((room, index) => (
            <li className="admin-rooms__item" key={index}>
              <Link to={`/admin/room/${index}`} className="item__link">
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
