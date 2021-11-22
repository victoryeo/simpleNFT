# NFT with hardhat and truffle

This project demonstrates a basic NFT with Hardhat and Truffle. 

hardhat
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network development
npx hardhat run scripts/deploy.js --network rinkeby
```

truffle
```shell
truffle compile
truffle migrate
```

to mint NFT, run
```
node scripts/mintNft.js
```

Sample output is:
```
The hash of your transaction is:  0x9dc23c0549219b8f2303d24b04b45e0daba5b578a789581cfd21899cd7c572ff 
Check Mempool to view the status of your transaction!
token URI: https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP
```
