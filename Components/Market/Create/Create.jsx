import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import axios from "axios";
import { ShyftSdk, Network } from "@shyft-to/js";

import {
  UPLOAD_IPFS_IMAGE,
  UPLOAD_METADATA,
  Notify,
} from "../../../Context/constants";

import { Title } from "../../index";
import BlockchainCard from "./BlockchainCard";
import Input from "./Input";
import Textarea from "./Textarea";

import { Loader } from "../../Home/index";

import { FaExternalLinkAlt } from "../../Home/SVG/index";

const SHYFT_AIP = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY;
const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN;
const NFT_FEE = process.env.NEXT_PUBLIC_FEE;
const MAINNET_PRC_URL = process.env.NEXT_PUBLIC_MAINNET_PRC_URL;

const xKey = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY.toString();
const endPoint = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT;
const NFT_MARKETPLACE = process.env.NEXT_PUBLIC_NFT_MARKETPLACE;

const Create = ({ setLoader }) => {
  const { connection } = useConnection();

  const [balance, setBalance] = useState();
  const [allowCreate, setAllowCreate] = useState(false);
  const {
    sendTransaction,
    connected,
    connect,
    disconnect,
    connecting,
    publicKey,
    wallet,
    wallets,
    select,
  } = useWallet();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [attributes, setAttributes] = useState({
    traitTypeOne: "",
    valueOne: "",
    traitTypeTwo: "",
    valueTwo: "",
  });

  const [nft, setNft] = useState({
    name: "",
    description: "",
    symbol: "",
    image: "",
    link: "",
  });

  const CREATE_NFT = async (nft, attributes) => {
    if (!publicKey) {
      console.error("Wallet not connected or metadata URI is missing");
      return;
    }
    setLoader(true);
    let network = localStorage.getItem("NETWORK");

    if (network == null) {
      network = "devnet";
    }

    const shyft = new ShyftSdk({
      apiKey: SHYFT_AIP,
      network: network == "devnet" ? Network.Devnet : Network.Mainnet,
    });

    const metadataURI = await UPLOAD_METADATA(nft, attributes, publicKey);

    const changeFee = await CHARGE_FEE();

    if (changeFee) {
      if (metadataURI) {
        try {
          const response = await shyft.nft.createFromMetadata({
            wallet: publicKey.toString(),
            metadataUri: metadataURI,
          });

          console.log("NFT created successfully:", response);
          const encodedTransaction = response.encoded_transaction;

          const transaction = Transaction.from(
            Buffer.from(encodedTransaction, "base64")
          );

          const signature = await sendTransaction(transaction, connection);
          console.log("Transaction sent:", signature);

          const confirmation = await connection.confirmTransaction(signature);
          console.log("Transaction confirmation:", confirmation);
          setLoader(false);
          notifySuccess("Transaction confirmation");
          window.location.href = "/";
        } catch (error) {
          console.log(error);
          console.log(
            "Error creating NFT:",
            error.response ? error.response.data : error
          );
          notifyError("Error creating NFT");
          setLoader(false);
        }
      }
    }
  };

  const handleImageChange = async (event) => {
    try {
      setLoader(true);
      const file = event.target.files[0];
      if (file) {
        const imgUrl = await UPLOAD_IPFS_IMAGE(file);
        console.log(imgUrl);
        setNft({ ...nft, image: imgUrl });
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          let networkActive = localStorage.getItem("NETWORK");

          if (networkActive == null) {
            networkActive = "devnet";
          }
          const network =
            networkActive === "mainnet-beta"
              ? MAINNET_PRC_URL
              : clusterApiUrl("devnet");

          const connectionCustom = new Connection(network);

          const balance = await connectionCustom.getBalance(
            new PublicKey(publicKey)
          );

          setBalance(balance / 1e9);
          const checkBal = balance / 1e9;

          if (checkBal > 2) {
            setAllowCreate(true);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      }
    };

    fetchBalance();
  }, [connected, publicKey, connection]);

  const CHARGE_FEE = async () => {
    if (!publicKey) {
      notifyError("Wallet not connected");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(ADMIN_ADDRESS),
          lamports: NFT_FEE * 1e9,
        })
      );

      const signature = await sendTransaction(transaction, connection);

      const confirmation = await connection.confirmTransaction(signature);
      console.log("Transaction confirmed:", confirmation);
      return confirmation;
    } catch (error) {
      console.error("Error sending SOL:", error);
      notifyError("Error sending SOL:");
    }
  };

  //CREATE NFT MARJETPLACE
  const createMarketplace = async () => {
    let nftUrl = `${endPoint}marketplace/create`;
    axios({
      url: nftUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      data: {
        network: "devnet",
        transaction_fee: 10,
        fee_payer: "27FHSrcXWrEk66BmM6JtP1HjqSDaGR7v6jzbsiq1hXaQ",
        fee_recipient: "27FHSrcXWrEk66BmM6JtP1HjqSDaGR7v6jzbsiq1hXaQ",
        creator_wallet: "27FHSrcXWrEk66BmM6JtP1HjqSDaGR7v6jzbsiq1hXaQ",
      },
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res.data);

        if (res.data.success === true) {
          const encodedTransaction = res.data.result.encoded_transaction;
          // Decode the encoded transaction
          const transaction = Transaction.from(
            Buffer.from(encodedTransaction, "base64")
          );

          // Send the transaction
          const signature = await sendTransaction(transaction, connection);
          console.log("Transaction sent:", signature);

          // Confirm the transaction
          const confirmation = await connection.confirmTransaction(signature);
          console.log("Transaction confirmation:", confirmation);

          notifySuccess("Transaction confirmation");
        } else {
        }
      })
      // Catch errors if any
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  return (
    <>
      <div id="create" className="tabcontent">
        <div className="wrapper-content-create">
          <Title title={"Create New File"} />

          <div className="widget-tabs relative">
            <div className="widget-content-tab">
              <div className="widget-content-inner description active">
                <div className="wrap-upload">
                  <div className="h-full">
                    <label className="uploadfile h-full flex items-center justify-center">
                      <div className="text-center">
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        <h5>Upload file</h5>
                        <p className="text">
                          Drag or choose your file to upload
                        </p>
                        <div className="text filename">
                          PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                        </div>
                        <input
                          type="file"
                          className=""
                          name="file"
                          onChange={handleImageChange}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="wrap-content w-full">
                  <div
                    id="commentform"
                    className="comment-form"
                    noValidate="novalidate"
                  >
                    <Input
                      title={"NFT name"}
                      placeholder={"nft name"}
                      name={"name"}
                      handleChange={(e) =>
                        setNft({ ...nft, name: e.target.value })
                      }
                    />
                    <Textarea
                      title={"Description"}
                      placeholder={"Please describe your nft"}
                      name={"message"}
                      handleChange={(e) =>
                        setNft({ ...nft, description: e.target.value })
                      }
                    />

                    <div className="flex gap30">
                      <Input
                        title={"Symbol"}
                        placeholder={"symbol"}
                        name={"properties"}
                        handleChange={(e) =>
                          setNft({ ...nft, symbol: e.target.value })
                        }
                      />
                      <Input
                        title={"Website"}
                        placeholder={"www.//link"}
                        name={"size"}
                        handleChange={(e) =>
                          setNft({ ...nft, link: e.target.value })
                        }
                      />
                    </div>
                    <fieldset className="blockchain">
                      <label
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        Blockchain
                      </label>
                      <div className="widget-coins flex gap30 flex-wrap">
                        <BlockchainCard name={"Bitcoin"} image={"01"} />
                        <BlockchainCard name={"Ethereum"} image={"02"} />
                        <BlockchainCard name={"Cardano"} image={"03"} />
                        <BlockchainCard name={"Solana"} image={"04"} />
                      </div>
                    </fieldset>
                    <div className="flex gap30">
                      <Input
                        title={"Attributes"}
                        placeholder={"type"}
                        name={"properties"}
                        handleChange={(e) =>
                          setAttributes({
                            ...attributes,
                            traitTypeOne: e.target.value,
                          })
                        }
                      />
                      <Input
                        title={""}
                        placeholder={"value"}
                        name={"size"}
                        handleChange={(e) =>
                          setAttributes({
                            ...attributes,
                            valueOne: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex gap30">
                      <Input
                        title={""}
                        placeholder={"type"}
                        name={"properties"}
                        handleChange={(e) =>
                          setAttributes({
                            ...attributes,
                            traitTypeTwo: e.target.value,
                          })
                        }
                      />
                      <Input
                        title={""}
                        placeholder={"value"}
                        name={"size"}
                        handleChange={(e) =>
                          setAttributes({
                            ...attributes,
                            valueTwo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="btn-submit flex gap30 justify-center">
                      <button
                        onClick={() => window.location.reload()}
                        // onClick={() => createMarketplace()}
                        className="tf-button style-1 h50 active"
                      >
                        Reload
                        <FaExternalLinkAlt />
                      </button>
                      {allowCreate ? (
                        <button
                          className="tf-button style-1 h50"
                          onClick={() => CREATE_NFT(nft, attributes)}
                        >
                          Create NFT
                          <FaExternalLinkAlt />
                        </button>
                      ) : (
                        <button className="tf-button style-1 h50">
                          Minimum required 2 Sol
                          <FaExternalLinkAlt />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
