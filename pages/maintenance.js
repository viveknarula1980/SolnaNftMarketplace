import React from "react";
import {
  FaWallet,
  FaExternalLinkAlt,
  Header_1,
  LuSearch,
  TiSocialVimeo,
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TbCurrencySolana,
  IoMenu,
} from "../Components/Home/SVG/index";

const maintenance = () => {
  return (
    <div id="wrapper">
      <div id="page">
        <div className="section-single-page maintanance">
          <a href="/">
            <img
              style={{
                width: "180px",
              }}
              src="logo.png"
              alt=""
            />
          </a>
          <div className="content">
            <div className="widget-bg-line">
              <div className="wraper">
                <div className="bg-grid-line y top">
                  <div className="bg-line" />
                </div>
                <div className="bg-grid-line x left">
                  <div className="bg-line" />
                </div>
                <div className="bg-grid-line y bottom">
                  <div className="bg-line" />
                </div>
                <div className="bg-grid-line x right">
                  <div className="bg-line" />
                </div>
              </div>
            </div>
            <div className="status">Website Is Under</div>
            <h1>Maintenance</h1>
            <p>
              We’re sorry our staff is still working on the issue for better
              experience
            </p>
            <div className="box-button">
              <a href="/marketplace" className="tf-button style-1 h50 active">
                My dashboard
                <i className="">
                  <FaExternalLinkAlt />
                </i>
              </a>
              <a href="/" className="tf-button style-1 h50">
                Back to home
                <i className="">
                  <FaExternalLinkAlt />
                </i>
              </a>
            </div>
          </div>

          <div className="widget-social">
            <ul className="flex justify-center">
              <li>
                <a href="#" className="">
                  <TiSocialVimeo />
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <TiSocialTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <TiSocialLinkedin />
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <TiSocialFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <TiSocialLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /#page */}
    </div>
  );
};

export default maintenance;
