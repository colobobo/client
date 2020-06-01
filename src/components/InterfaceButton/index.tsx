import React, { FC } from "react";

// style
import "./index.scss";

interface Props {
  color: string;
  text: string;
  extraClass?: string;
  actionOnClick?: any;
}

const InterfaceButton: FC<Props> = ({
  color,
  text,
  extraClass,
  actionOnClick
}) => {
  // return
  return (
    <button
      onClick={actionOnClick}
      className={`${extraClass} button button--${color}`}
    >
      <span>{text}</span>
    </button>
  );
};

export default InterfaceButton;
