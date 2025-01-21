import React from "react";
import { TbCurrencySolana } from "../SVG/index";

const TopPromotion = ({ index, image, name, price }) => {
  return (
    <div key={index + 5} className="tf-author-box style-3 text-center">
      <div className="author-avatar ">
        <img
          src={`assets/images/avatar/avatar-${image}.png`}
          alt=""
          className="avatar"
        />
        <div className="number">{index}</div>
      </div>
      <div className="author-infor ">
        <h5>
          <a href="author-2.html">{name}</a>
        </h5>
        <h6 className="price gem style-1">
          <i>
            <TbCurrencySolana />
          </i>
          7,080.95
        </h6>
      </div>
    </div>
  );
};

export default TopPromotion;
