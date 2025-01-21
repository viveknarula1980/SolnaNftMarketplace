import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Preloader, Mouse, Footer, Header } from "../Components/Home/index";
import { BuyNFT } from "../Components/index";
import { Filter } from "../Components/Home/index";
import { CiHeart } from "../Components/Home/SVG/index";
import { FaRegCopy } from "../Components/SVG/index";
import { MdKeyboardArrowDown } from "../Components/SVG/index";
import { ACTIVE_LISTING, SHORTEN_ADDRESS } from "../Context/constants";
import { Loader } from "../Components/Home/index";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;

const popular = () => {
  const { publicKey } = useWallet();
  const [loader, setLoader] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [buy, setBuy] = useState();

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const listing = await ACTIVE_LISTING();

        console.log(listing);

        setNfts(listing);
      };

      if (nfts.length === 0) {
        getNFTs();
      }
    }
  }, [publicKey]);

  return (
    <>
      <Preloader />
      <div id="wrapper">
        <div id="page" className="pt-40">
          <Header nfts={nfts?.length} />
          {/* //TITLE */}
          <div className="flat-title-page">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading text-center">Popular NFTs </h1>
                </div>
              </div>
            </div>
          </div>
          {/* //BODY */}
          <div className="tf-section-2 ranking">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12 mb-30">
                  <div className="widget-tabs relative">
                    <div className="widget-content-tab pt-10">
                      <div className="widget-content-inner active" style={{}}>
                        <div className="widget-table-ranking">
                          <div
                            data-wow-delay="0s"
                            className="wow fadeInUp table-ranking-heading animated"
                            style={{
                              visibility: "visible",
                              animationDelay: "0s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div className="column1">
                              <h3>Image</h3>
                            </div>
                            <div className="column2">
                              <h3>Name</h3>
                            </div>
                            <div className="column">
                              <h3>Symbol</h3>
                            </div>
                            <div className="column">
                              <h3>Seller </h3>
                            </div>
                            <div className="column">
                              <h3>Price </h3>
                            </div>
                            <div className="column">
                              <h3>View</h3>
                            </div>
                            <div className="column">
                              <h3>Buy</h3>
                            </div>
                          </div>
                          <div className="table-ranking-content">
                            {nfts?.map((item, index) => (
                              <div
                                data-wow-delay={`${index}s`}
                                className="wow fadeInUp fl-row-ranking animated"
                                style={{
                                  visibility: "visible",
                                  animationDelay: `${index}s`,
                                  animationName: "fadeInUp",
                                }}
                              >
                                <div className="td1">
                                  <div className="item-rank">{index + 1}. </div>
                                  <div className="item-avatar">
                                    <img src={item?.nft.image_uri} alt="" />
                                  </div>
                                  <div className="item-name">
                                    {SHORTEN_ADDRESS(item?.nft.mint)}
                                  </div>
                                </div>
                                <div className="td2">
                                  <h6 className="price gem">
                                    {item?.nft.name}
                                  </h6>
                                </div>
                                <div className="td3 danger">
                                  <h6> {item?.nft.symbol}</h6>
                                </div>
                                <div className="td4 warning">
                                  <h6>
                                    {SHORTEN_ADDRESS(item?.seller_address)}
                                  </h6>
                                </div>
                                <div className="td5">
                                  <h6 className="price gem">
                                    &nbsp;{item?.price} SOL
                                  </h6>
                                </div>
                                <div className="td6">
                                  <a
                                    href={`/nft-details?mint=${item?.nft.mint}`}
                                  >
                                    <h6>View</h6>
                                  </a>
                                </div>
                                {item?.seller_address ===
                                publicKey?.toString() ? (
                                  <div className="td7">
                                    <h6>Listed</h6>
                                  </div>
                                ) : (
                                  <div className="td7">
                                    <h6
                                      onClick={() => setBuy(item)}
                                      data-toggle="modal"
                                      data-target={`#buyNft`}
                                    >
                                      Buy Now
                                    </h6>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <BuyNFT buy={buy} setLoader={setLoader} />
      <Mouse />
      {loader && <Loader />}
    </>
  );
};

export default popular;
