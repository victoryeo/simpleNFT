require("dotenv").config();
const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/simNFT.sol/simNFT.json");
const contractInterface = contract.abi;

// https://docs.ethers.io/v5/api/providers
const provider = ethers.getDefaultProvider("rinkeby", {
  infura: process.env.API_URL,
});

// https://docs.ethers.io/v5/api/signer/#Wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// nft contract address
const nftAddress = process.env.NFT_ADDRESS;

//https://docs.ethers.io/v5/api/contract/contract
const simNFT = new ethers.Contract(
  nftAddress,
  contractInterface,
  wallet
);
//console.log(simNFT)

const main = async () => {
  try {
    //const accounts = await provider.listAccounts();
    //console.log(accounts[0])
    const transaction = await simNFT.mintNFT(process.env.PUBLIC_KEY, "https://gateway.pinata.cloud/ipfs/QmNNaRsvHaYr72Ce1KXJDdNX4UCxw66yHe7ECyMwvRUiHE")
    console.log(transaction)
  } 
  catch(e) { 
    console.log("something went wrong", e)
  }
}

main();
