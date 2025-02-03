const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const CreditScoring = await hre.ethers.getContractFactory("CreditScoring");
  
  // Verifier contract addresses
  const debtToIncomeVerifier = process.env.DEBTTOINCOMEVERIFIER;
  const transactionHistoryVerifier = process.env.TRANSACTIONHISTORYVERIFIER;
  const walletAgeVerifier = process.env.WALLETAGEVERIFIER;
  const walletBalanceVerifier = process.env.WALLETBALANCEVERIFIER;

  const creditScoring = await CreditScoring.deploy(
    debtToIncomeVerifier,
    transactionHistoryVerifier,
    walletAgeVerifier,
    walletBalanceVerifier
  );

  // Wait for deployment to complete
  await creditScoring.waitForDeployment();
  
  // Get the deployed contract address using getAddress()
  const deployedAddress = await creditScoring.getAddress();
  console.log("CreditScoring deployed to:", deployedAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });