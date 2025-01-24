require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error("Error: PRIVATE_KEY not found in .env file");
  process.exit(1);
}

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 1114,
      allowUnlimitedContractSize: true,
    },
    coredao: {
      url: `https://rpc.test2.btcs.network`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 1114,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};