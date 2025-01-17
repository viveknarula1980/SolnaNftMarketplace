import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

import { NFT_TRANSFER, Notify } from "../../Context/constants";
import { FaExternalLinkAlt } from "../SVG/index";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const NFTTransfer = ({ nftTransfer, setLoader }) => {
  const { connection } = useConnection();
  const [recevier, setRecevier] = useState();

  const { sendTransaction, publicKey } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const transfer = async () => {
    setLoader(true);
    let nftUrl = `${endPoint}nft/transfer_many`;

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
          token_addresses: [nftTransfer.mint],
          from_address: publicKey.toString(),
          to_address: recevier,
        },
      });

      if (res.data.success === true) {
        const encodedTransaction = res.data.result.encoded_transactions[0];

        const transaction = Transaction.from(
          Buffer.from(encodedTransaction, "base64")
        );

        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction sent:", signature);

        const confirmation = await connection.confirmTransaction(signature);
        console.log("Transaction confirmation:", confirmation);
        Notify(
          "NFT Transfer Successfully",
          nftTransfer?.image_uri,
          nftTransfer?.name
        );
        setLoader(false);
        notifySuccess("Transaction confirmation");
      } else {
        console.log("The API request failed");
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      notifyError(err.message);
      console.log(err.message);
      setLoader(false);
    }
  };

  return (
    <div
      className="modal fade popup"
      id="popup_bid"
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
                placeholder=" address*"
                onChange={(e) => setRecevier(e.target.value)}
              />
            </fieldset>
            <a
              style={{
                color: "black",
              }}
              onClick={() => transfer()}
              className="tf-button style-1 h50"
            >
              Transfer NFT
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

export default NFTTransfer;
