import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

import { Notify } from "../../Context/constants";
import { FaExternalLinkAlt } from "../SVG/index";

const RECEVIED = process.env.NEXT_PUBLIC_RECEVIED_FEE;
const LISTING_FEE = process.env.NEXT_PUBLIC_NFT_LISTING_FEE;

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const ListForSale = ({ nftTransfer, setLoader }) => {
  const { connection } = useConnection();

  const [price, setPrice] = useState();

  const { sendTransaction, publicKey } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const listNFT = async (nft_addr) => {
    setLoader(true);
    let nftUrl = `${endPoint}marketplace/list`;

    let network = localStorage.getItem("NETWORK");

    if (network == null) {
      network = "devnet";
    }
    try {
      const res = await axios({
        url: nftUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        data: {
          network: network,
          nft_address: nftTransfer?.mint,
          marketplace_address: NFT_MARKETPLACE,
          price: Number(price),
          seller_wallet: publicKey.toString(),
          service_charge: {
            receiver: RECEVIED,
            amount: LISTING_FEE,
          },
        },
      });

      if (res.data.success === true) {
        const encodedTransaction = res.data.result.encoded_transaction;

        const transaction = Transaction.from(
          Buffer.from(encodedTransaction, "base64")
        );

        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction sent:", signature);

        const confirmation = await connection.confirmTransaction(signature);
        console.log("Transaction confirmation:", confirmation);
        setLoader(false);
        Notify(
          "NFT Listed Successfully",
          nftTransfer?.image_uri,
          nftTransfer?.name
        );

        notifySuccess("Transaction confirmation");
      } else {
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
      notifyError(err);
      console.log(err.message);
    }
  };

  return (
    <div
      className="modal fade popup"
      id="listForSale"
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
              <img src={nftTransfer?.image_uri} alt="" />
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
            <h2>{nftTransfer?.name}</h2>
            <p>{nftTransfer?.description.slice(0, 115)}...</p>
            <fieldset className="email">
              <input
                type="text"
                className="style-1"
                id="text"
                placeholder=" price*"
                onChange={(e) => setPrice(e.target.value)}
              />
            </fieldset>
            <a
              style={{
                color: "black",
              }}
              onClick={() => listNFT()}
              className="tf-button style-1 h50"
            >
              List NFT
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

export default ListForSale;
