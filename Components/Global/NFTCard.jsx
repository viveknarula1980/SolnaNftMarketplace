import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiHeart } from "../SVG/index";
import { FaRegCopy } from "../SVG/index";
import { SHORTEN_ADDRESS, copyText } from "../../Context/constants";

const NFTCard = ({ index, item }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, []);
  return (
    <div key={index} className="col-item">
      <div className="tf-card-box style-1">
        <div className="card-media">
          <a>
            <img src={`${item?.image_uri}`} alt="" />
          </a>
          <span className="wishlist-button ">
            <CiHeart />
          </span>
          <div className="button-place-bid">
            <a
              href={`/nft-details?mint=${item?.mint}`}
              target="_blank"
              className="tf-button"
            >
              <span>View NFT</span>
            </a>
          </div>
        </div>
        <h5 className="name">
          <a href="#">{item?.name}</a>
        </h5>
        <div className="author flex items-center">
          <div className="avatar">
            <img src={user?.image || "logo-solana.png"} alt={user?.name} />
          </div>
          <div className="info">
            <span>Created by:</span>
            <h6>
              <a href="#">
                {SHORTEN_ADDRESS(item?.creators[0].address)} {item?.symbol}
              </a>
            </h6>
          </div>
        </div>
        <div className="divider" />
        <div className="meta-info flex items-center justify-between">
          <span className="text-bid">Mint </span>
          <h6 className="price gem">
            {SHORTEN_ADDRESS(item?.mint)} &nbsp;
            <FaRegCopy onClick={() => copyText(item?.mint)} />
          </h6>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
