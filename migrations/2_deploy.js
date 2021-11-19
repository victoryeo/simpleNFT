// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const simNFT = artifacts.require("simNFT");

module.exports = function(deployer) {
  deployer.deploy(simNFT);
};