import React, { FC, useRef, useEffect } from "react";
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
  play?: boolean;
  autoplay?: boolean;
  onInstance?: (spritesheet: any) => void;
}

const NumericKeypad: FC<Props> = ({
  className,
  animationID,
  startAt,
  onInstance,
  play,
  autoplay
}) => {
  const { image, widthFrame, heightFrame, steps, fps, loop } = animations[
    animationID
  ];

  const spritesheetInstance = useRef<any>(null);

  const getInstance = (spritesheet: any) => {
    spritesheetInstance.current = spritesheet;
    if (onInstance) {
      onInstance(spritesheet);
    }
  };

  useEffect(() => {
    if (play) {
      spritesheetInstance.current?.goToAndPlay(1);
    }
  }, [play]);

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
      timeout={1}
      getInstance={getInstance}
    />
  );
};

export default NumericKeypad;
