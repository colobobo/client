import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// style
import "./index.scss";

// assets
import { ReactComponent as ArrowBack } from "../../assets/icons/arrow-back.svg";

import logo from "../../assets/logo/logo-simple.png";
import dot from "../../assets/illustrations/about/dot.png";
import illustration from "../../assets/illustrations/about/devices.png";

import alexandrePicture from "../../assets/illustrations/about/team/person1.png";
import alixPicture from "../../assets/illustrations/about/team/person2.png";
import circePicture from "../../assets/illustrations/about/team/person3.png";
import erwannPicture from "../../assets/illustrations/about/team/person4.png";
import irisPicture from "../../assets/illustrations/about/team/person5.png";
import justinePicture from "../../assets/illustrations/about/team/person6.png";

const About: FC = () => {
  const { t } = useTranslation();

  // return

  return (
    <div className="about">
      <div className="about__container">
        <Link to="/" className="about__back">
          <ArrowBack />
        </Link>
        <div className="about__summary">
          <img className="summary__logo" src={logo} alt="Logo" />
          <p
            className="summary__description"
            dangerouslySetInnerHTML={{ __html: t("about.summary.description") }}
          />
          <div className="summary__illustrations">
            <img src={dot} alt="Players" />
            <img src={illustration} alt="Illustration" />
          </div>
        </div>
        <div className="about__introduction">
          <p
            className="introduction__description"
            dangerouslySetInnerHTML={{
              __html: t("about.introduction.description")
            }}
          />
          <ul className="introduction__team">
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={alexandrePicture}
                  alt="Alexandre Masse"
                />
                <p className="person__name">Alexandre Massé</p>
                <p className="person__role">
                  {t("about.introduction.role.developer")}
                </p>
              </div>
            </li>
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={alixPicture}
                  alt="Alix Chabagny"
                />
                <p className="person__name">Alix Chabagny</p>
                <p className="person__role">
                  {t("about.introduction.role.designer")}
                </p>
              </div>
            </li>
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={circePicture}
                  alt="Circé Grand"
                />
                <p className="person__name">Circé Grand</p>
                <p className="person__role">
                  {t("about.introduction.role.developer")}
                </p>
              </div>
            </li>
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={erwannPicture}
                  alt="Erwann Letue"
                />
                <p className="person__name">Erwann Letue</p>
                <p className="person__role">
                  {t("about.introduction.role.developer")}
                </p>
              </div>
            </li>
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={irisPicture}
                  alt="Iris Mangin"
                />
                <p className="person__name">Iris Mangin</p>
                <p className="person__role">
                  {t("about.introduction.role.designer")}
                </p>
              </div>
            </li>
            <li className="introduction__person">
              <div className="person__container">
                <img
                  className="person__picture"
                  src={justinePicture}
                  alt="Justine Lenouvel"
                />
                <p className="person__name">Justine Lenouvel</p>
                <p className="person__role">
                  {t("about.introduction.role.designer")}
                </p>
              </div>
            </li>
          </ul>
          <p
            className="introduction__acknowledgements"
            dangerouslySetInnerHTML={{
              __html: t("about.introduction.acknowledgements")
            }}
          />
          <p className="introduction__signature">
            {t("about.introduction.signature")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
