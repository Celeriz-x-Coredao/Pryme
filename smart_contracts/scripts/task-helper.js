const { ethers } = require("hardhat");

const testHelpers = {
  async deployMockVerifier(name) {
    const Factory = await ethers.getContractFactory(name);
    const verifier = await Factory.deploy();
    await verifier.waitForDeployment();
    return verifier;
  },

  async generateTestWallet() {
    const wallet = ethers.Wallet.createRandom();
    return wallet.connect(ethers.provider);
  },

  async mineBlocks(numBlocks) {
    for (let i = 0; i < numBlocks; i++) {
      await ethers.provider.send("evm_mine");
    }
  },

  async timeTravel(seconds) {
    await ethers.provider.send("evm_increaseTime", [seconds]);
    await ethers.provider.send("evm_mine");
  },

  async getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
};

module.exports = testHelpers;