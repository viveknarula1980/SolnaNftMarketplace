import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Banner,
  BodySideBar,
  Title,
  Filter,
  NFTCard,
  NFTCard2,
  NFTCard3,
  InLoader,
} from "../../index";

import {
  GET_USER_NFTS,
  GET_COLLECTIONS,
  SELLER_LISTINGS,
  ACTIVE_LISTING,
} from "../../../Context/constants";

const SHYFT_AIP = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;
const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN;
const NFT_FEE = process.env.NEXT_PUBLIC_FEE;

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const Dashboard = ({
  publicKey,
  setNftTransfer,
  activeListing,
  dashboardAPI,
  setRemoveNFT,
  setBurnNFT,
  reCall,
  setReCall,
}) => {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const [nfts, setNfts] = useState([]);
  const [marketListing, setMarketListing] = useState([]);
  const [mpListings, setMplisting] = useState([]);
  const [stopeLoader, setStopeLoader] = useState(true);

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const nfts = await GET_USER_NFTS(publicKey);

        localStorage.setItem("OWN_NFTS", JSON.stringify(nfts));

        setNfts(nfts);
        setReCall(reCall + 1);

        const timeoutId = setTimeout(() => {
          setStopeLoader(false);
        }, 5000);
      };
      if (dashboardAPI && marketListing.length === 0) {
        getNFTs();
      }
    }
  }, [publicKey, dashboardAPI]);

  const CALLING_LISTING = async () => {
    if (marketListing.length === 0) {
      const listings = await SELLER_LISTINGS(publicKey);

      const filteredListings = listings.filter(
        (item) => Object.keys(item.nft).length !== 0
      );

      setMarketListing(filteredListings);
    } else {
      console.log(marketListing);
    }
  };

  useEffect(() => {
    if (activeListing != null) {
      let arr_listng = [];
      activeListing.forEach((listing) => {
        if (listing) arr_listng.push(listing.nft_address);
      });
      setMplisting(arr_listng);
    }
  }, [activeListing, nfts]);

  return (
    <div id="bid" className="tabcontent">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />
          <Title title={"Dashboard"} />

          <div className="widget-tabs relative">
            <Filter />
            <ul className="widget-menu-tab">
              <li className="item-title">
                <span className="inner">Own NFTs</span>
              </li>
              <li className="item-title active">
                <span className="inner">Transfer</span>
              </li>
              <li className="item-title">
                <span className="inner">List For Sale</span>
              </li>
              <li className="item-title" onClick={() => CALLING_LISTING()}>
                <span className="inner">My Listings</span>
              </li>
              <li className="item-title">
                <span className="inner">Burn NFT</span>
              </li>
            </ul>

            <div className="widget-content-tab">
              <div className="widget-content-inner">
                {nfts?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is found in the marketplace, be the
                          first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {nfts?.map((item, index) => (
                      <NFTCard item={item} index={index} />
                    ))}
                  </div>
                )}
              </div>
              <div className="widget-content-inner active">
                {nfts?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is found in the marketplace, be the
                          first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {nfts?.map((item, index) => (
                      <NFTCard2
                        item={item}
                        index={index}
                        handleClick={setNftTransfer}
                        elementID="popup_bid"
                        name="Transfer"
                        listed={mpListings}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="widget-content-inner">
                {nfts?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is found in the marketplace, be the
                          first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {nfts?.map((item, index) => (
                      <NFTCard2
                        item={item}
                        index={index}
                        handleClick={setNftTransfer}
                        elementID="listForSale"
                        name="List"
                        listed={mpListings}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="widget-content-inner">
                {marketListing?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is found in the marketplace, be the
                          first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {marketListing?.map((item, index) => (
                      <NFTCard3
                        item={item}
                        index={index}
                        publicKey={publicKey}
                        setRemoveNFT={setRemoveNFT}
                        UnElementID={"unlistNFT"}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="widget-content-inner">
                {nfts?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is found in the marketplace, be the
                          first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {nfts?.map((item, index) => (
                      <NFTCard2
                        item={item}
                        index={index}
                        handleClick={setBurnNFT}
                        elementID="burnNFT"
                        name="Burn NFT"
                        listed={mpListings}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <BodySideBar reCall={reCall} />
      </div>
    </div>
  );
};

export default Dashboard;
