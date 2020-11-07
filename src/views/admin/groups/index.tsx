import React, { FC } from "react";
import { Link } from "react-router-dom";

//config
import { adminGroups } from "../../../config";

//styles
import "./index.scss";

const Groups: FC = () => {
  return (
    <div className="admin-rooms">
      <div className="admin-rooms__container">
        <h1 className="admin-rooms__title">Liste des groupes :</h1>
        <div className="admin-rooms__table">
          <div className="admin-rooms__table__row">
            <div className="admin-rooms__table__row__cell">
              <strong>Name</strong>
            </div>
            <div className="admin-rooms__table__row__cell">
              <strong>Auto-connect</strong>
            </div>
            <div className="admin-rooms__table__row__cell">
              <strong>Devices</strong>
            </div>
          </div>
          {adminGroups.map((group, index) => (
            <Link
              to={`/admin/group/${index}`}
              className="admin-rooms__table__row"
              key={index}
            >
              <div className="admin-rooms__table__row__cell">{group.name}</div>
              <div className="admin-rooms__table__row__cell">
                {group.autoconnect ? "✅" : "❌"}
              </div>
              <div className="admin-rooms__table__row__cell">
                {group.devices.map((device, i) => (
                  <span key={i}>{device}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
