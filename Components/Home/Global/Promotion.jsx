import React from "react";

import { TbCurrencySolana } from "../SVG/index";
import promotionNfts from "../Data/promotion.json";
import TopPromotion from "../Global/TopPromotion";

const Seller = () => {
  return (
    <div id="top" className="tf-section seller ">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-section">
              <h2 className="tf-title pb-30">Top NFTs Promotions</h2>
            </div>
          </div>

          <div className="col-md-12">
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "3rem",
                overflowX: "auto",
              }}
            >
              {promotionNfts?.map((item, index) => (
                <div
                  key={index + 5}
                  className="tf-author-box style-3 text-center"
                >
                  <div className="author-avatar ">
                    <img
                      src={`assets/images/avatar/avatar-${item.image}.png`}
                      alt=""
                      className="avatar"
                    />
                    <div className="number">{index + 1}</div>
                  </div>
                  <div className="author-infor ">
                    <h5>
                      <a href="author-2.html">{item.name}</a>
                    </h5>
                    <h6 className="price gem style-1">
                      <i>
                        <TbCurrencySolana />
                      </i>
                      {item?.price}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
