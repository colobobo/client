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
  startAt?: number;
  autoplay?: boolean;
}

const NumericKeypad: FC<Props> = ({
  className,
  animationID,
  startAt,
  autoplay
}) => {
  const { image, widthFrame, heightFrame, steps, fps, loop } = animations[
    animationID
  ];

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
      startAt={startAt}
    />
  );
};

export default NumericKeypad;
