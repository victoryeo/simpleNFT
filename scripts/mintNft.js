const Web3 = require('web3')
require('dotenv').config()

const ganachehost = 'http://localhost:9545'

// example web3 using testnet
const web3 = new Web3(new Web3.providers.HttpProvider(ganachehost))

const nftContract = require("../artifacts/contracts/simNFT.sol/simNFT.json");

// nft contract address
const nftAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"

let nftInst = new web3.eth.Contract(
  nftContract.abi, nftAddress
)

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function mintNFT(tokenURI) {
  let accounts = await web3.eth.getAccounts()
  
  //get latest nonce
  const nonce = await web3.eth.getTransactionCount(accounts[0], "latest")

  //const tokenID = await nftInst.methods.mintNFT(accounts[0], tokenURI)
  //console.log(tokenID)
  //const uri = await nftInst.methods.tokenURI(tokenID).call()
  //console.log(uri)

  //the transaction
  const tx = {
    from: accounts[0],
    to: nftAddress,
    nonce: nonce,
    gas: 500000,
    data: nftInst.methods.mintNFT(accounts[0], tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT(
  // metadata hashcode QmYueiuRNmL4....is from pinata
  "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"
)