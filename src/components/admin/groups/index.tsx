import React, { FC } from "react";
import { Link } from "react-router-dom";

//config
import { groups } from "../../../config/groups";

//styles
import "./index.scss";

const Groups: FC = () => {
  return (
    <div className="admin-rooms">
      <div className="admin-rooms__container">
        <h1 className="admin-rooms__title">Les groupes :</h1>
        <ul className="admin-rooms__list">
          {groups.map((group, index) => (
            <li className="admin-rooms__item" key={index}>
              <Link to={`/admin/group/${index}`} className="item__link">
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Groups;
