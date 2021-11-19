async function main() {
  const SimNFT = await ethers.getContractFactory("simNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const simNFT = await SimNFT.deploy()
  console.log("Contract deployed to address:", simNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
