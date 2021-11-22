const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  it("Should mint new NFT", async function () {
    const [owner] = await ethers.getSigners();
    console.log(owner.address)

    const SimNFT = await ethers.getContractFactory("simNFT");
    const simNFT = await SimNFT.deploy();
    await simNFT.deployed();

    const tokenURI="https://gateway.pinata.cloud/ipfs/QmNNaRsvHaYr72Ce1KXJDdNX4UCxw66yHe7ECyMwvRUiHE"

    const mintNFT = await simNFT.mintNFT(owner.address, tokenURI);

    // wait until the transaction is mined
    await mintNFT.wait();
    //console.log(mintNFT);
    expect(await mintNFT.blockHash).to.be.a('string');
  });
});
