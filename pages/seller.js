import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Preloader, Mouse, Footer, Header } from "../Components/Home/index";
import { Filter } from "../Components/Home/index";
import { CiHeart } from "../Components/Home/SVG/index";
import { FaRegCopy } from "../Components/SVG/index";
import { MdKeyboardArrowDown } from "../Components/SVG/index";
import { GET_USER_NFTS, SHORTEN_ADDRESS, copyText } from "../Context/constants";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

const seller = () => {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState();
  const [activeSeller, setActiveSeller] = useState();

  useEffect(() => {
    const mintParam = new URLSearchParams(window.location.search).get(
      "address"
    );
    setActiveSeller(mintParam);

    const fetchNftData = async () => {
      try {
        const nfts = await GET_USER_NFTS(mintParam);

        console.log(nfts);
        setNfts(nfts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNftData();
  }, []);

  return (
    <>
      <Preloader />
      <div id="wrapper">
        <div id="page" className="pt-40">
          <Header />
          {/* //TITLE */}
          <div className="flat-title-page">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading text-center">Seller NFTs </h1>
                  <div className="breadcrumbs flex justify-center">
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={"assets/images/avatar/avatar-box-03.jpg"}
                      alt="Image"
                    />

                    <p
                      style={{
                        paddingLeft: "1rem",
                      }}
                    >
                      {SHORTEN_ADDRESS(activeSeller)}{" "}
                      <FaRegCopy onClick={() => copyText(activeSeller)} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //BODY */}
          <div className="tf-section-2 discover-item loadmore-12-item">
            <div className="themesflat-container">
              <div className="row">
                <Filter />
                {nfts?.map((item, index) => (
                  <div
                    key={index}
                    className="  col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className="tf-card-box style-1">
                      <div className="card-media">
                        <a href="#">
                          <img src={item?.image_uri} alt={item?.name} />
                        </a>
                        <span className="wishlist-button ">
                          <CiHeart />
                        </span>
                        <div className="featured-countdown">
                          <span className="js-countdown">{item?.symbol}</span>
                        </div>
                        <div class="button-place-bid">
                          <a
                            href={`/nft-details?mint=${item?.mint}`}
                            class="tf-button"
                          >
                            <span>View NFT</span>
                          </a>
                        </div>
                      </div>
                      <h5 className="name">
                        <a>{item?.name}</a>
                      </h5>
                      <div className="author flex items-center">
                        <div className="avatar">
                          <img
                            src={
                              item?.seller_address === publicKey?.toString()
                                ? `${user?.image}`
                                : "assets/images/avatar/avatar-box-03.jpg"
                            }
                            alt="Image"
                          />
                        </div>
                        <div className="info">
                          <span>Posted by:</span>
                          <h6>
                            <a href="#">{SHORTEN_ADDRESS(item?.owner)}</a>{" "}
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
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Mouse />
    </>
  );
};

export default seller;
