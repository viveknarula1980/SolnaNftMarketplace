import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { NFTCard, Filter } from "../index";
import { FaArrowRightLong, CiHeart } from "../SVG/index";
import { SHORTEN_ADDRESS } from "../../../Context/constants";

const Discover = ({ nfts, publicKey, setBuy }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, []);

  return (
    <div id="discover" className="tf-section discover-item loadmore-8-item">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-section pb-30">
              <h2 className="tf-title ">Discover item</h2>
              <a
                href="https://www.theblockchaincoders.com/pro-nft-marketplace"
                target="_blank"
                className=""
              >
                Discover more{" "}
                <i>
                  <FaArrowRightLong />
                </i>
              </a>
            </div>
          </div>
          <Filter />
          {nfts?.map((item, index) => (
            <div
              key={index}
              data-wow-delay={`0.${index}s`}
              className="wow fadeInUp  col-xl-3 col-lg-4 col-md-6 col-sm-6"
            >
              <div className="tf-card-box style-1">
                <div className="card-media">
                  <a href="#">
                    <img src={item?.nft.image_uri} alt={item?.nft.name} />
                  </a>
                  <span className="wishlist-button ">
                    <CiHeart />
                  </span>
                  <div className="featured-countdown">
                    <span className="js-countdown">{item?.nft.symbol}</span>
                  </div>
                  <div class="button-place-bid">
                    <a
                      href={`/nft-details?mint=${item?.nft.mint}`}
                      class="tf-button"
                    >
                      <span>View NFT</span>
                    </a>
                  </div>
                </div>
                <h5 className="name">
                  <a>{item?.nft.name}</a>
                </h5>
                <div className="author flex items-center">
                  <div className="avatar">
                    <img
                      src={
                        item?.seller_address === publicKey?.toString()
                          ? `${user?.image || "logo-solana.png"}`
                          : "logo-solana.png"
                      }
                      alt="Image"
                    />
                  </div>
                  <div className="info">
                    <span>Posted by:</span>
                    <h6>
                      <a href="#">{SHORTEN_ADDRESS(publicKey?.toString())}</a>{" "}
                    </h6>
                  </div>
                </div>
                <div className="divider" />
                <div className="meta-info flex items-center justify-between">
                  <span className="text-bid">{item?.price} SOL</span>
                  {item?.seller_address === publicKey?.toString() ? (
                    <a
                      className="tf-button style-1 h50"
                      style={{
                        color: "black",
                      }}
                    >
                      Listed
                    </a>
                  ) : (
                    <a
                      className="tf-button style-1 h50"
                      style={{
                        color: "black",
                      }}
                      onClick={() => setBuy(item)}
                      data-toggle="modal"
                      data-target={`#buyNft`}
                    >
                      Buy NFT
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
