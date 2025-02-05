
# Full-Stack Solana Blockchain NFT Marketplace DApp

Build and Deploy a Full-Stack Solana Blockchain NFT Marketplace DApp with Next.js, Context API, and Metaplex

 This comprehensive guide covers setting up your development environment, integrating Metaplex for NFT creation, managing state with Context API, and deploying your marketplace. Perfect for developers looking to leverage Solana’s speed and low fees to launch a scalable NFT platform.

#### Install Vs Code Editor

```
   GET: VsCode Editor
   URL: https://code.visualstudio.com/download
```

#### NodeJs & NPM Version

```
  NodeJs: v18.12.1 || LATEST
  NPM: 8.19.2 || LATEST
  URL: https://nodejs.org/en/download
``

#### Install Vs Code Editor
```
  GET: VsCode Editor
  URL: https://code.visualstudio.com/download
```

#### NodeJs & NPM Version

```
  NodeJs: v18.12.1 
  NPM: 8.19.2 || LATEST
  URL: https://nodejs.org/en/download
```

#### Test Faucets

Solana Playground will provide you with some free test faucets which you can transfer to your wallet address for deploying the contract

```
  Get: Free Test Faucets
  URL : https://beta.solpg.io/
  URL : https://faucet.solana.com/
```

#### Solana Playground

We are using Solana Playground for deploying the contract and generation of the ABI in the project, but you can use any other tools like Hardhat, etc.

```
  OPEN: Solana Playground
  URL: https://beta.solpg.io/
```

#### Solana Network

```
  OPEN: Solana Network
  URL: https://explorer.solana.com/
```

#### PINATA CLOUD

```
  OPEN: PINATA CLOUD
  URL: https://pinata.cloud/
```

#### SHYFT

```
  OPEN: SHYFT
  URL: https://shyft.to/
```

#### ALCHEMY

```
  OPEN: ALCHEMY
  URL: https://www.alchemy.com/
```

#### FORMSPREE

```
  OPEN: FORMSPREE
  URL: https://formspree.io/
```
#### PACKAGE JSON

```
{
  "name": "solana-nfts-marketplace",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@formspree/react": "^2.5.1",
    "@metaplex/js": "^4.12.0",
    "@shyft-to/js": "^0.2.40",
    "@solana/wallet-adapter-phantom": "^0.9.24",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@solana/wallet-adapter-react-ui": "^0.9.35",
    "@solana/wallet-adapter-wallets": "^0.19.32",
    "@solana/web3.js": "^1.95.4",
    "axios": "^1.6.8",
    "bs58": "^6.0.0",
    "next": "13.4.13",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hot-toast": "^2.4.1",
    
  }
}

```

```
# PINATE KEYS
NEXT_PUBLIC_PINATA_AIP_KEY =
NEXT_PUBLIC_PINATA_SECRECT_KEY =

#  SHYFT
NEXT_PUBLIC_SHYFT_AIP_KEY =
NEXT_PUBLIC_SHYFT_ENDPOINT = https://api.shyft.to/sol/v1/
NEXT_PUBLIC_NFT_MARKETPLACE =

# MAINNET RPC URL
NEXT_PUBLIC_MAINNET_PRC_URL = https://solana-mainnet.g.alchemy.com/v2/M_Vs3I53rHZDrLMQUVQ-DMqA1HsyuB_w



#FORMSPREE
NEXT_PUBLIC_FORMSPREE_API  =


# ADMIN
NEXT_PUBLIC_ADMIN =
NEXT_PUBLIC_FEE = 0.005

# FEE CHARGE
NEXT_PUBLIC_RECEVIED_FEE =
NEXT_PUBLIC_NFT_BUY_FEE = 1
NEXT_PUBLIC_NFT_LISTING_FEE = 1

## Contributing:

Contributions are welcome! Please open an issue to discuss proposed changes or submit a pull request.

