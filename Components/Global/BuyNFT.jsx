import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

import { Notify } from "../../Context/constants";
import { FaExternalLinkAlt } from "../SVG/index";

const RECEVIED = process.env.NEXT_PUBLIC_RECEVIED_FEE;
const NFT_BUY_FEE = process.env.NEXT_PUBLIC_NFT_BUY_FEE;

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const BuyNFT = ({ buy, setLoader }) => {
  const { connection } = useConnection();
  const [price, setPrice] = useState();

  const { sendTransaction, publicKey } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const buyNow = async (buy) => {
    try {
      setLoader(true);
      let network = localStorage.getItem("NETWORK");

      if (network == null) {
        network = "devnet";
      }
      const nftUrl = `${endPoint}marketplace/buy`;

      const response = await axios({
        url: nftUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        data: {
          network: network,
          marketplace_address: NFT_MARKETPLACE,
          nft_address: buy?.nft_address,
          price: Number(buy?.price),
          seller_address: buy?.seller_address,
          buyer_wallet: publicKey.toString(),
          service_charge: {
            receiver: RECEVIED,
            amount: NFT_BUY_FEE,
          },
        },
      });

      if (response.data.success) {
        const encodedTransaction = response.data.result.encoded_transaction;

        const transaction = Transaction.from(
          Buffer.from(encodedTransaction, "base64")
        );

        const signature = await sendTransaction(transaction, connection);

        const confirmation = await connection.confirmTransaction(signature);
        Notify("NFT Purchase Successfully", buy?.nft.image_uri, buy?.nft.name);
        console.log("Transaction confirmation:", confirmation);
        notifySuccess("NFT Purchased Successfully");
        setLoader(false);
      } else {
        console.log("Failed! Error Occurred!");
        setLoader(false);
      }
    } catch (err) {
      console.log("Error during the purchase:", err);
      notifyError(err.message);
      setLoader(false);
    }
  };

  return (
    <div
      className="modal fade popup"
      id="buyNft"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-body">
            <div className="image">
              <img src={buy?.nft.image_uri} alt="" />
            </div>
            <div className="logo-rotate">
              <img
                src="logo-solana.png"
                style={{
                  width: "80px",
                  borderRadius: "50%",
                  height: "auto",
                }}
              />
            </div>
            <h2>{buy?.nft.name}</h2>
            <p>{buy?.nft.description.slice(0, 115)}...</p>

            <a
              style={{
                color: "black",
              }}
              onClick={() => buyNow(buy)}
              className="tf-button style-1 h50"
            >
              Buy {buy?.price} {buy?.currency_symbol}
              <i className="">
                <FaExternalLinkAlt />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNFT;
