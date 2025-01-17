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
const comming = () => {
  return (
    <div id="wrapper">
      <div id="page">
        <div className="section-single-page coming-soon">
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
            <h1>Coming soon</h1>
            <p>
              in the meantime, sign up for our monthly newsletter to stay up to
              date
            </p>
            <fieldset className="email">
              <input
                type="email"
                className="style-1"
                id="email"
                placeholder="Email address*"
              />
            </fieldset>
            <a href="" className="tf-button style-1 h50">
              Subscribe
              <i className="">
                <FaExternalLinkAlt />
              </i>
            </a>
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
    </div>
  );
};

export default comming;
