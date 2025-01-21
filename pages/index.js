import React, { useState, useEffect } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Preloader,
  Mouse,
  PopUp,
  Footer,
  Header,
  Promotion,
  Featured,
  Hero,
  Information,
  Popular,
  Collections,
  Action,
  Discover,
} from "../Components/Home/index";
import { BuyNFT } from "../Components/index";
import { ACTIVE_LISTING } from "../Context/constants";
import { Loader } from "../Components/Home/index";

const index = () => {
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
  const [nfts, setNfts] = useState([]);
  const [buy, setBuy] = useState();

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const listing = await ACTIVE_LISTING();

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
          <Hero publicKey={publicKey} />
          <Promotion />
          {nfts?.length ? <Featured nfts={nfts} publicKey={publicKey} /> : ""}
          <Information />{" "}
          {nfts?.length ? (
            <Popular nfts={nfts} publicKey={publicKey} setBuy={setBuy} />
          ) : (
            ""
          )}
          <Collections />
          <Action publicKey={publicKey} />
          {nfts?.length ? (
            <Discover nfts={nfts} publicKey={publicKey} setBuy={setBuy} />
          ) : (
            ""
          )}
          <Footer />
        </div>

        <PopUp />
        <BuyNFT buy={buy} setLoader={setLoader} />
      </div>
      <Mouse />
      {loader && <Loader />}
    </>
  );
};

export default index;
