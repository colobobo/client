import React, { FC } from "react";
import Spritesheet from "react-responsive-spritesheet";
import ClassNames from "classnames";

// config
import animations from "../../config/animations";

// style
import "./index.scss";

interface Props {
  animationID: string;
  className?: string;
}

const NumericKeypad: FC<Props> = ({ className, animationID }) => {
  const {
    image,
    widthFrame,
    heightFrame,
    steps,
    fps,
    loop,
    autoplay
  } = animations[animationID];

  // return

  return (
    <Spritesheet
      className={ClassNames("animation__sprite", className)}
      image={image}
      widthFrame={widthFrame}
      heightFrame={heightFrame}
      steps={steps}
      fps={fps}
      loop={loop}
      autoplay={autoplay}
    />
  );
};

export default NumericKeypad;
