const { task } = require("hardhat/config");
const config = require("./config");

task("deploy-verifiers", "Deploys all verifier contracts")
  .setAction(async (taskArgs, hre) => {
    const deploy = require("./scripts/deploy.js").deploy;
    await deploy();
  });

task("verify-deployment", "Verifies all deployed contracts")
  .setAction(async (taskArgs, hre) => {
    await require("./scripts/verify.js");
  });

task("test-verifiers", "Tests all verifier contracts")
  .setAction(async (taskArgs, hre) => {
    await hre.run("test");
  });

task("show-gas", "Shows gas usage for deployments")
  .setAction(async (taskArgs, hre) => {
    const utils = require("./utils");
    const contracts = [
      "DebtToIncomeVerifier",
      "TransactionHistoryVerifier",
      "WalletAgeVerifier",
      "WalletBalanceVerifier",
      "CreditScoring"
    ];

    for (const contract of contracts) {
      const cost = await utils.estimateDeploymentCost(contract);
      console.log(`${contract} deployment cost: ${ethers.formatEther(cost)} ETH`);
    }
  });