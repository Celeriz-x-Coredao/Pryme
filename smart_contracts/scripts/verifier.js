const hre = require("hardhat");

async function deployVerifiers() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get contract factories
  const verifierFactories = {
    debtToIncome: await ethers.getContractFactory("DebtToIncomeVerifier"),
    transactionHistory: await ethers.getContractFactory("TransactionHistoryVerifier"),
    walletAge: await ethers.getContractFactory("WalletAgeVerifier"),
    walletBalance: await ethers.getContractFactory("WalletBalanceVerifier")
  };

  // Deploy contracts and store instances
  const deployedVerifiers = {
    debtToIncome: await verifierFactories.debtToIncome.deploy(),
    transactionHistory: await verifierFactories.transactionHistory.deploy(),
    walletAge: await verifierFactories.walletAge.deploy(),
    walletBalance: await verifierFactories.walletBalance.deploy()
  };

  // Wait for all deployments to complete and get addresses
  const verifierAddresses = {};
  
  for (const [key, verifier] of Object.entries(deployedVerifiers)) {
    await verifier.waitForDeployment();
    verifierAddresses[key] = await verifier.getAddress();
    console.log(`${key}Verifier deployed to:`, verifierAddresses[key]);
  }

  return verifierAddresses;
}

async function main() {
  const deployedAddresses = await deployVerifiers();
  return {
    debtToIncomeVerifier: deployedAddresses.debtToIncome,
    transactionHistoryVerifier: deployedAddresses.transactionHistory,
    walletAgeVerifier: deployedAddresses.walletAge,
    walletBalanceVerifier: deployedAddresses.walletBalance
  };
}

main()
  .then((deployed) => {
    console.log("Deployed contracts:", deployed);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });