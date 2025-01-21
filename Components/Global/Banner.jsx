import React from "react";

import { FaExternalLinkAlt } from "../SVG/index";

const MarketBanner = () => {
  return (
    <div className="action__body w-full mb-40">
      <div className="tf-tsparticles">
        <div id="tsparticles1" data-color="#161616" data-line="#000" />
      </div>
      <h2>Discover, create and sell your own NFT</h2>
      <div className="flat-button flex">
        <a
          target="_blank"
          href="/popular"
          className="tf-button style-2 h50 w190 mr-10"
        >
          Popular NFTs
          <FaExternalLinkAlt />
        </a>
        <a href="#" className="tf-button style-2 h50 w230">
          Create your first NFT
          <FaExternalLinkAlt />
        </a>
      </div>
      <div className="bg-home7">
        <div className="swiper-container autoslider4reverse">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="assets/images/item-background/bg-action-1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketBanner;
