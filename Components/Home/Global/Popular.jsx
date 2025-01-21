import React, { useState, useEffect } from "react";
import { SHORTEN_ADDRESS } from "../../../Context/constants";
import { SiEthereum, CiHeart, TbCurrencySolana } from "../SVG/index";

const NewSaller = ({ nfts, publicKey, setBuy }) => {
  const newArray = [...nfts]?.reverse();

  const [user, setUser] = useState();
  const [mpListings, setMplisting] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, []);

  useEffect(() => {
    if (nfts != null) {
      let arr_listng = [];
      nfts.forEach((listing) => {
        if (listing) arr_listng.push(listing.nft_address);
      });
      setMplisting(arr_listng);
    }
  }, [nfts]);

  return (
    <div id="popular" className="tf-section-1 seller ">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-section">
              <h2 className="tf-title pb-20">Popular items in last</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div className="featured pt-10 swiper-container carousel">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  overflowX: "auto",
                }}
              >
                {newArray
                  ?.map((item, index) => (
                    <div key={index} className="tf-card-box style-1">
                      <div className="card-media">
                        <a href="#">
                          <img src={item?.nft.image_uri} alt={item?.nft.name} />
                        </a>
                        <span className="wishlist-button ">
                          <CiHeart />
                        </span>
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
                        <a href="#">{item?.nft.name}</a>
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
                            <a href="#">
                              {SHORTEN_ADDRESS(publicKey?.toString())}
                            </a>{" "}
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
                  ))
                  .slice(0, 4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSaller;
