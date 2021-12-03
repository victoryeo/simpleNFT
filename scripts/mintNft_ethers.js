require("dotenv").config();
const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/simNFT.sol/simNFT.json");
const contractInterface = contract.abi;

// https://docs.ethers.io/v5/api/providers
const provider = ethers.getDefaultProvider("rinkeby", {
  infura: process.env.API_URL,
});

// two alternative way of getting infura provider for rinkeby testnet
const INFURA_PROJ_ID = process.env.INFURA_PROJ_ID
const provider2 = new ethers.providers.InfuraProvider("rinkeby", INFURA_PROJ_ID)
const provider3 = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_PROJ_ID}`);

// https://docs.ethers.io/v5/api/signer/#Wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// get account address of the wallet
const signer = wallet.connect(provider);
console.log(signer.address)

// nft contract address
const nftAddress = process.env.NFT_CONTRACT_ADDRESS;

//https://docs.ethers.io/v5/api/contract/contract
const simNFT = new ethers.Contract(
  nftAddress,
  contractInterface,
  wallet
);
//console.log(simNFT)

const main = async () => {
  try {

    const transaction = await simNFT.mintNFT(process.env.PUBLIC_KEY, "https://gateway.pinata.cloud/ipfs/QmNNaRsvHaYr72Ce1KXJDdNX4UCxw66yHe7ECyMwvRUiHE")
    console.log(transaction)

    await simNFT.updateNFT(8, "https://gateway.pinata.cloud/ipfs/QmQmGeiSdRYT5hJTURtA5tMj7sMLsAmtAJpH2xTnd37xG2")
  } 
  catch(e) { 
    console.log("something went wrong", e)
  }
}

main();
