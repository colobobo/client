import React, { FC } from "react";

// style
import "./index.scss";

export enum Colors {
  blue = "blue",
  yellow = "yellow",
  pink = "pink",
  red = "red"
}

interface Props {
  color: Colors;
  text?: string;
  classNames?: string;
  onClick?: any;
}

const InterfaceButton: FC<Props> = ({
  children,
  color,
  text,
  classNames,
  onClick
}) => {
  // return
  return (
    <div
      onClick={onClick}
      className={`${classNames ? classNames : ""} button button--${color}`}
    >
      {text && <span>{text}</span>}
      {children}
    </div>
  );
};

export default InterfaceButton;
