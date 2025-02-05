const hre = require("hardhat");

// Configuration object for verifier contracts
const VERIFIER_CONFIG = {
  DebtToIncomeVerifier: {
    name: "DebtToIncomeVerifier",
    description: "Verifies debt to income ratio"
  },
  TransactionHistoryVerifier: {
    name: "TransactionHistoryVerifier",
    description: "Verifies transaction history"
  },
  WalletAgeVerifier: {
    name: "WalletAgeVerifier",
    description: "Verifies wallet age"
  },
  WalletBalanceVerifier: {
    name: "WalletBalanceVerifier",
    description: "Verifies wallet balance"
  }
};

// Utility functions
const logDeployment = (contractName, address) => {
  console.log(`\n✅ ${contractName} deployed to: ${address}`);
  console.log(`${'='.repeat(50)}`);
};

const validateDeployment = async (contract) => {
  if (!contract.address) {
    throw new Error(`Deployment failed - contract address is undefined`);
  }
  return true;
};

// Main deployment function
async function deployVerifierContract(contractName, signer) {
  try {
    console.log(`\n📄 Deploying ${contractName}...`);
    
    const Factory = await hre.ethers.getContractFactory(contractName, signer);
    const contract = await Factory.deploy();
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    await validateDeployment(contract);
    
    logDeployment(contractName, address);
    return address;
  } catch (error) {
    console.error(`❌ Error deploying ${contractName}:`, error.message);
    throw error;
  }
}

// Deploy all verifiers
async function deployAllVerifiers(signer) {
  const deployedContracts = {};
  const gasUsage = {};

  console.log("\n🚀 Starting deployment process...");
  console.log(`Deploying with account: ${signer.address}`);
  console.log(`Account balance: ${await hre.ethers.formatEther(await signer.provider.getBalance(signer.address))} ETH`);
  console.log(`${'='.repeat(50)}`);

  for (const [contractKey, config] of Object.entries(VERIFIER_CONFIG)) {
    const startGas = await signer.provider.getBalance(signer.address);
    
    deployedContracts[contractKey] = await deployVerifierContract(
      config.name,
      signer
    );

    const endGas = await signer.provider.getBalance(signer.address);
    gasUsage[contractKey] = startGas - endGas;
  }

  return { deployedContracts, gasUsage };
}

// Main function
async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    const { deployedContracts, gasUsage } = await deployAllVerifiers(deployer);

    // Format output for return
    const formattedAddresses = {
      debtToIncomeVerifier: deployedContracts.DebtToIncomeVerifier,
      transactionHistoryVerifier: deployedContracts.TransactionHistoryVerifier,
      walletAgeVerifier: deployedContracts.WalletAgeVerifier,
      walletBalanceVerifier: deployedContracts.WalletBalanceVerifier
    };

    // Log deployment summary
    console.log("\n📊 Deployment Summary");
    console.log(`${'='.repeat(50)}`);
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`${name}:`);
      console.log(`  Address: ${address}`);
      console.log(`  Gas Used: ${hre.ethers.formatEther(gasUsage[name])} ETH`);
    });

    return formattedAddresses;
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    throw error;
  }
}

// Execute deployment
if (require.main === module) {
  main()
    .then((deployed) => {
      console.log("\n✨ All contracts deployed successfully!");
      console.log("Deployed contracts:", deployed);
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Deployment failed:", error);
      process.exit(1);
    });
}

module.exports = {
  deploy: main,
  VERIFIER_CONFIG
};