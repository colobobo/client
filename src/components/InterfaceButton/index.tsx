import React, { FC } from "react";
import Classnames from "classnames";

// style
import "./index.scss";

export enum Colors {
  blue = "blue",
  yellow = "yellow",
  pink = "pink",
  red = "red",
  white = "white"
}

interface Props {
  color: Colors;
  text?: string;
  classNames?: string;
  onClick?: any;
  disabled?: boolean;
}

const InterfaceButton: FC<Props> = ({
  children,
  color,
  text,
  classNames,
  onClick,
  disabled
}) => {
  // return
  return (
    <div
      onClick={onClick}
      className={Classnames("button", `button--${color}`, classNames, {
        "button--disabled": disabled
      })}
    >
      {text && <span>{text}</span>}
      {children}
    </div>
  );
};

export default InterfaceButton;
