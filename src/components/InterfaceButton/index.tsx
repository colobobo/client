import React, { FC } from "react";

// style
import "./index.scss";

interface Props {
  color: string;
  text?: string;
  extraClass?: string;
  actionOnClick?: any;
}

const InterfaceButton: FC<Props> = ({
  children,
  color,
  text,
  extraClass,
  actionOnClick
}) => {
  // return
  return (
    <div
      onClick={actionOnClick}
      className={`${extraClass ? extraClass : ""} button button--${color}`}
    >
      {text && <span>{text}</span>}
      {children}
    </div>
  );
};

export default InterfaceButton;
