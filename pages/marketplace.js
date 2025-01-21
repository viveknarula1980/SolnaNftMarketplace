import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";

//INTERNAL IMPORT
import {
  Preloader,
  Mouse,
  MarketHeader,
  SideBar,
  NFTTransfer,
  Dashboard,
  Create,
  Explore,
  CreatedNFT,
  History,
  Market,
  Settings,
  Wallet,
  ListForSale,
  BuyNFT,
  UnlistNFT,
  BurnNFT,
} from "../Components/index";
import { ACTIVE_LISTING } from "../Context/constants";
import { Loader } from "../Components/Home/index";

const market = () => {
  const {
    connect,
    disconnect,
    connecting,
    publicKey,
    wallet,
    wallets,
    select,
  } = useWallet();
  const [loader, setLoader] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [nftTransfer, setNftTransfer] = useState();
  const [buy, setBuy] = useState();
  const [removeNFT, setRemoveNFT] = useState();
  const [listForSale, setListForSale] = useState();
  const [burnNFT, setBurnNFT] = useState();

  const [dashboardAPI, setDashboardAPI] = useState(false);
  const [marketAPI, setMarketAPI] = useState(true);
  const [historyAPI, setHistoryAPI] = useState(false);
  const [sellerAPI, setSellerAPI] = useState(false);
  const [collectionAPI, setCollectionAPI] = useState(false);
  const [stopeLoader, setStopeLoader] = useState(true);
  const [reCall, setReCall] = useState(0);

  const [activeListing, setActiveListing] = useState([]);

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const listing = await ACTIVE_LISTING();

        setActiveListing(listing);

        setReCall(reCall + 1);

        const timeoutId = setTimeout(() => {
          setStopeLoader(false);
        }, 5000);
      };

      if (marketAPI && activeListing.length === 0) {
        getNFTs();
      }
    }
  }, [publicKey]);

  return (
    <>
      <Preloader />

      <div id="wrapper">
        <div id="page" className="market-page">
          <MarketHeader
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            reCall={reCall}
          />
          <div className="flat-tabs">
            <SideBar
              setDashboardAPI={setDashboardAPI}
              setHistoryAPI={setHistoryAPI}
              setSellerAPI={setSellerAPI}
              setCollectionAPI={setCollectionAPI}
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
            <div className="content-tabs">
              <Create setLoader={setLoader} />
              <Market
                publicKey={publicKey}
                activeListing={activeListing}
                setBuy={setBuy}
                setRemoveNFT={setRemoveNFT}
                marketAPI={marketAPI}
                stopeLoader={stopeLoader}
                reCall={reCall}
              />
              <Dashboard
                publicKey={publicKey}
                setNftTransfer={setNftTransfer}
                activeListing={activeListing}
                dashboardAPI={dashboardAPI}
                setRemoveNFT={setRemoveNFT}
                setBurnNFT={setBurnNFT}
                setReCall={setReCall}
                reCall={reCall}
              />
              <Explore
                sellerAPI={sellerAPI}
                setReCall={setReCall}
                reCall={reCall}
              />

              <CreatedNFT publicKey={publicKey} />
              <Wallet />
              <History
                historyAPI={historyAPI}
                setReCall={setReCall}
                reCall={reCall}
              />
              <Settings setReCall={setReCall} reCall={reCall} />
            </div>
          </div>
        </div>

        <NFTTransfer nftTransfer={nftTransfer} setLoader={setLoader} />
        <ListForSale nftTransfer={nftTransfer} setLoader={setLoader} />
        <BuyNFT buy={buy} setLoader={setLoader} />
        <UnlistNFT removeNFT={removeNFT} setLoader={setLoader} />
        <BurnNFT burnNFT={burnNFT} setLoader={setLoader} />
      </div>

      <Mouse />
      {loader && <Loader />}
    </>
  );
};

export default market;
