import React, { FC, useRef } from "react";
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
  onInstance?: (spriteSheet: any) => void;
}

const NumericKeypad: FC<Props> = ({
  className,
  animationID,
  startAt,
  autoplay,
  onInstance
}) => {
  const { image, widthFrame, heightFrame, steps, fps, loop } = animations[
    animationID
  ];

  const spritesheetInstance = useRef();

  const getInstance = (spritesheet: any) => {
    spritesheetInstance.current = spritesheet;
    if (onInstance) {
      onInstance(spritesheet);
    }
  };

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
      getInstance={getInstance}
    />
  );
};

export default NumericKeypad;
