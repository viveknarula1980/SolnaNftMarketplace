import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Preloader, Mouse, Footer, Header } from "../Components/Home/index";
import { MdKeyboardArrowDown } from "../Components/SVG/index";
import { SHORTEN_ADDRESS } from "../Context/constants";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;

const nftDetails = () => {
  const { publicKey } = useWallet();
  const [nft, setNft] = useState();

  useEffect(() => {
    const mintParam = new URLSearchParams(window.location.search).get("mint");

    let network = localStorage.getItem("NETWORK");

    if (network == null) {
      network = "devnet";
    }

    let nftUrl = `${endPoint}nft/read?token_address=${mintParam}&network=${network}`;
    const fetchNftData = async () => {
      try {
        const response = await fetch(nftUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch the NFT data from server");
        }

        const data = await response.json();
        console.log("Fetch Status: ", data.success);
        console.log("Fetch Status: ", data);

        setNft(data.result);
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
          <div className="tf-section-2 product-detail">
            <div className="themesflat-container">
              <div className="row">
                <div data-wow-delay="0s" className="wow fadeInLeft col-md-6">
                  <div className="tf-card-box style-5 mb-0">
                    <div className="card-media mb-0">
                      <a href="#">
                        <img src={nft?.image_uri} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    data-wow-delay="0s"
                    className="wow fadeInRight infor-product"
                  >
                    <div className="text">{nft?.collection.name}</div>

                    <h2>{nft?.name}</h2>
                    <div className="author flex items-center mb-30">
                      <div className="avatar">
                        <img
                          src="assets/images/avatar/avatar-box-05.jpg"
                          alt="Image"
                        />
                      </div>
                      <div className="info">
                        <span>Owned by:</span>
                        <h6>
                          <a href="author-1.html">
                            {SHORTEN_ADDRESS(nft?.owner)}
                          </a>
                        </h6>
                      </div>
                    </div>
                    <div className="meta mb-20">
                      {nft?.attributes_array.map((item, index) => (
                        <div className="meta-item view">{item?.value}</div>
                      ))}
                    </div>
                  </div>
                  <div
                    data-wow-delay="0s"
                    className="wow fadeInRight product-item time-sales"
                  >
                    <h6>Welcome to marketplace</h6>
                    <div className="content">
                      <div className="text">Listed For Sale</div>
                      <div className="flex justify-between">
                        <p>
                          Creator <span>Art</span>
                        </p>

                        <a
                          href="/marketplace"
                          className="tf-button style-1 h50 w216"
                        >
                          NFT Avalible for Sale
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-wow-delay="0s"
                    className="wow fadeInRight product-item description"
                  >
                    <h6>Description</h6>
                    <i className="">
                      <MdKeyboardArrowDown />
                    </i>
                    <div className="content">
                      <p>{nft?.description}</p>
                    </div>
                  </div>
                </div>
                <div data-wow-delay="0s" className="wow fadeInUp col-12">
                  <div className="product-item details">
                    <h6>Details</h6>
                    <i className="">
                      <MdKeyboardArrowDown />
                    </i>
                    <div className="content">
                      <div className="details-item">
                        <span>Mint Address</span>
                        <span className="tf-color">
                          {SHORTEN_ADDRESS(nft?.mint)}
                        </span>
                      </div>
                      <div className="details-item">
                        <span>Symbol</span>
                        <span className="tf-color">{nft?.symbol}</span>
                      </div>
                      <div className="details-item">
                        <span>Website</span>
                        <span className="tf-color">{nft?.external_url}</span>
                      </div>
                      <div className="details-item">
                        <span>Mint Address</span>
                        <span className="tf-color">
                          {SHORTEN_ADDRESS(nft?.owner)}
                        </span>
                      </div>
                      <div className="details-item">
                        <span>Royalty</span>
                        <span className="tf-color">{nft?.royalty}</span>
                      </div>
                      <div className="details-item">
                        <span>Token Standard</span>
                        <span className="">Non Fungible</span>
                      </div>
                      <div className="details-item">
                        <span>Update Authority</span>
                        <span className="">
                          {SHORTEN_ADDRESS(nft?.update_authority)}
                        </span>
                      </div>
                      <div className="details-item">
                        <span>Metadata URI</span>
                        <span className="">
                          {" "}
                          {SHORTEN_ADDRESS(nft?.metadata_uri)}
                        </span>
                      </div>
                      <div className="details-item mb-0">
                        <span>Creator Earnings</span>
                        <span className="">8%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-wow-delay="0s" className="wow fadeInUp col-12">
                  <div className="product-item traits style-1">
                    <h6>Attributes</h6>
                    <i className="">
                      <MdKeyboardArrowDown />
                    </i>
                    <div className="content">
                      {nft?.attributes_array.map((item, index) => (
                        <div key={index} className="trait-item">
                          <p>{item?.trait_type}</p>
                          <div className="title">{item?.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

export default nftDetails;
