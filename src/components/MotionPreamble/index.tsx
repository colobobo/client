import React, { FC } from "react";

// components
import Area from "../../components/Area";

// assets
import testPicture from "../../assets/motions/preamble/test.png";

// style
import "./index.scss";

const MotionPreamble: FC = () => {
  // return

  return (
    <div className="preamble">
      <div className="preamble__container">
        <Area height="min">
          <img src={testPicture} alt="Test" />
        </Area>
      </div>
    </div>
  );
};

export default MotionPreamble;
