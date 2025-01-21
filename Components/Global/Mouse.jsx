import React from "react";

import { Mouse_1 } from "../SVG/index";

const Mouse = () => {
  return (
    <>
      <div className="tf-mouse tf-mouse-outer" />
      <div className="tf-mouse tf-mouse-inner" />
      <div className="progress-wrap active-progress">
        <Mouse_1 />
      </div>
    </>
  );
};

export default Mouse;
