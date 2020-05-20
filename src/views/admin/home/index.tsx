import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

// assets
import iconEye from "../../../assets/icons/eye.png";

const Home: FC = () => {
  return (
    <div className="admin-homepage">
      <div className="admin-homepage__container">
        <Link to="/admin/groups" className="admin-homepage__link">
          <div className="admin-homepage__link-container">
            <img src={iconEye} alt="logo" />
            <span>
              Voir
              <br />
              les groupes
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
