import { ethers } from "hardhat";
import dotenv from "dotenv";
import { CreditScoring__factory } from "../typechain-types";

dotenv.config();

async function deployContract() {
  try {
    // Get contract factory using newer syntax
    const creditScoringFactory = await ethers.getContractFactory("CreditScoring");

    // Get verifier addresses from environment variables
    const verifierAddresses = {
      debtToIncome: process.env.DEBTTOINCOMEVERIFIER,
      transactionHistory: process.env.TRANSACTIONHISTORYVERIFIER,
      walletAge: process.env.WALLETAGEVERIFIER,
      walletBalance: process.env.WALLETBALANCEVERIFIER
    };

    // Deploy contract with verifier addresses
    const creditScoring = await creditScoringFactory.deploy(
      verifierAddresses.debtToIncome,
      verifierAddresses.transactionHistory,
      verifierAddresses.walletAge,
      verifierAddresses.walletBalance
    );

    // Wait for deployment
    const deployedContract = await creditScoring.waitForDeployment();
    
    // Get deployed address
    const contractAddress = await deployedContract.getAddress();
    
    console.log(`CreditScoring deployed successfully to: ${contractAddress}`);
    return contractAddress;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

// Self-executing async function
(async () => {
  try {
    await deployContract();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();