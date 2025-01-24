const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  // Deploy DebtToIncomeVerifier
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  const DebtToIncomeVerifier = await ethers.getContractFactory("DebtToIncomeVerifier");
  const debtToIncomeVerifier = await DebtToIncomeVerifier.deploy();
  await debtToIncomeVerifier.waitForDeployment();
  // console.log("DebtToIncomeVerifier deployed to:", await debtToIncomeVerifier.getAddress());

  // Deploy TransactionHistoryVerifier
  const TransactionHistoryVerifier = await ethers.getContractFactory("TransactionHistoryVerifier");
  const transactionHistoryVerifier = await TransactionHistoryVerifier.deploy();
  await transactionHistoryVerifier.waitForDeployment();
  console.log("TransactionHistoryVerifier deployed to:", await transactionHistoryVerifier.getAddress());

  // Deploy WalletAgeVerifier
  const WalletAgeVerifier = await ethers.getContractFactory("WalletAgeVerifier");
  const walletAgeVerifier = await WalletAgeVerifier.deploy();
  await walletAgeVerifier.waitForDeployment();
  console.log("WalletAgeVerifier deployed to:", await walletAgeVerifier.getAddress());

  // Deploy WalletBalanceVerifier
  const WalletBalanceVerifier = await ethers.getContractFactory("WalletBalanceVerifier");
  const walletBalanceVerifier = await WalletBalanceVerifier.deploy();
  await walletBalanceVerifier.waitForDeployment();
  console.log("WalletBalanceVerifier deployed to:", await walletBalanceVerifier.getAddress());

  return {
    debtToIncomeVerifier: await debtToIncomeVerifier.getAddress(),
    transactionHistoryVerifier: await transactionHistoryVerifier.getAddress(),
    walletAgeVerifier: await walletAgeVerifier.getAddress(),
    walletBalanceVerifier: await walletBalanceVerifier.getAddress()
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