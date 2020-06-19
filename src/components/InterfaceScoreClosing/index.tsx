import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { gsap, Bounce } from "gsap";

// style
import "./index.scss";

const InterfaceScoreClosing: FC = () => {
  const { t } = useTranslation();
  /* TODO : IN V2 ADD MORE REPEAT IN FULL SCREEN */
  const repeats = [1, 3];
  const repeatIndex = Math.floor(Math.random() * repeats.length);
  const currentRepeat = repeats[repeatIndex];

  const titlesItems = useMemo(() => {
    let titlesArray = [];

    for (let i = 0; i < currentRepeat; i++) {
      let title = (
        <p className="score-closing__title" key={i}>
          {t("transition.animation.faster")}
        </p>
      );
      titlesArray.push(title);
    }

    return titlesArray;
  }, [currentRepeat, t]);

  useEffect(() => {
    const titles = document.getElementsByClassName("score-closing__title");
    gsap.to(titles, 0.5, { scale: 1.3, ease: Bounce.easeOut });
    gsap.to(titles, 0.3, { scale: 1, delay: 0.3 });
  }, [titlesItems]);

  // return

  return (
    <div className="score-closing">
      <div className={`score-closing__container score-closing--${repeatIndex}`}>
        {titlesItems}
      </div>
    </div>
  );
};

export default InterfaceScoreClosing;
