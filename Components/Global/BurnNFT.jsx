import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

import { Notify } from "../../Context/constants";
import { FaExternalLinkAlt } from "../SVG/index";

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;

const BurnNFT = ({ burnNFT, setLoader }) => {
  const { connection } = useConnection();

  const [price, setPrice] = useState();

  const { sendTransaction, publicKey } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const BURN_NFT = async (burnNFT) => {
    try {
      setLoader(true);
      let network = localStorage.getItem("NETWORK");

      if (network == null) {
        network = "devnet";
      }
      const nftUrl = `${endPoint}nft/burn_detach`;

      const response = await axios({
        url: nftUrl,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        data: {
          network: network,
          wallet: publicKey.toString(),
          token_address: burnNFT?.mint,
        },
      });

      if (response.data.success) {
        const encodedTransaction = response.data.result.encoded_transaction;

        const transaction = Transaction.from(
          Buffer.from(encodedTransaction, "base64")
        );

        const signature = await sendTransaction(transaction, connection);

        const confirmation = await connection.confirmTransaction(signature);
        Notify("NFT Burn Successfully", burnNFT?.image_uri, burnNFT?.name);
        notifySuccess("NFT Burn Successfully");
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
      id="burnNFT"
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
              <img src={burnNFT?.image_uri} alt="" />
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
            <h2>{burnNFT?.name}</h2>
            <p>{burnNFT?.description.slice(0, 115)}...</p>
            <p>Are you sure</p>

            <a
              style={{
                color: "black",
              }}
              onClick={() => BURN_NFT(burnNFT)}
              className="tf-button style-1 h50"
            >
              Yes {burnNFT?.symbol} Burn
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

export default BurnNFT;
