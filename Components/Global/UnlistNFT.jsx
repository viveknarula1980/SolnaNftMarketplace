import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

import { Notify } from "../../Context/constants";
import { FaExternalLinkAlt } from "../SVG/index";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const UnlistNFT = ({ removeNFT, setLoader }) => {
  const { connection } = useConnection();

  const { sendTransaction, publicKey } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const UNLIST_NFT = async () => {
    try {
      setLoader(true);
      const nftUrl = `${endPoint}marketplace/unlist`;

      let network = localStorage.getItem("NETWORK");

      if (network == null) {
        network = "devnet";
      }

      if (!removeNFT) {
        throw new Error("NFT details are missing.");
      }

      const response = await axios.post(
        nftUrl,
        {
          network: network,
          marketplace_address: NFT_MARKETPLACE,
          list_state: removeNFT.list_state,
          seller_wallet: removeNFT.seller_address,
          fee_payer: publicKey.toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        }
      );

      if (response.data.success) {
        const encodedTransaction = response.data.result.encoded_transaction;

        console.log("Encoded Transaction:", encodedTransaction);

        const transaction = Transaction.from(
          Buffer.from(encodedTransaction, "base64")
        );

        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction sent with signature:", signature);

        const confirmation = await connection.confirmTransaction(signature);
        console.log("Transaction confirmation status:", confirmation);
        setLoader(false);
        Notify(
          "NFT Unlisted Successfully",
          removeNFT?.nft.image_uri,
          removeNFT?.nft.name
        );
        notifySuccess("NFT Unlisted Successfully");
      } else {
        console.log("Failed to unlist NFT: Error occurred in response.");
        setLoader(false);
      }
    } catch (err) {
      console.log("Error during unlisting NFT:", err);
      notifyError(err.message);
      setLoader(false);
    }
  };

  return (
    <div
      className="modal fade popup"
      id="unlistNFT"
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
              <img src={removeNFT?.nft.image_uri} alt="" />
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
            <h2>{removeNFT?.nft.name}</h2>
            <p>{removeNFT?.nft.description.slice(0, 115)}...</p>

            <a
              style={{
                color: "black",
              }}
              onClick={() => UNLIST_NFT()}
              className="tf-button style-1 h50"
            >
              Unlist {removeNFT?.price} {removeNFT?.currency_symbol}
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

export default UnlistNFT;
