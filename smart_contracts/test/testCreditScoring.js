const { ethers } = require("hardhat");

async function main() {
    // Replace this with your deployed contract address
    const contractAddress = "0xD042a224F458E4789DC0E9353b5c1F00bf928D98";

    // Replace this with the ABI of your CreditScoring contract
    const abi = [
        "function verifyAndCalculateCreditScore(" +
        "uint256[2] aDebtToIncome, uint256[2][2] bDebtToIncome, uint256[2] cDebtToIncome, uint256[1] publicSignalsDebtToIncome, " +
        "uint256[2] aTransactionHistory, uint256[2][2] bTransactionHistory, uint256[2] cTransactionHistory, uint256[1] publicSignalsTransactionHistory, " +
        "uint256[2] aWalletAge, uint256[2][2] bWalletAge, uint256[2] cWalletAge, uint256[1] publicSignalsWalletAge, " +
        "uint256[2] aWalletBalance, uint256[2][2] bWalletBalance, uint256[2] cWalletBalance, uint256[1] publicSignalsWalletBalance" +
        ") public",
    ];

    const provider = ethers.provider;
    const signer = provider.getSigner();

    // Attach the deployed contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Example zk-SNARK proof inputs
    const aDebtToIncome = [0, 0]; // Replace with real proof values
    const bDebtToIncome = [
        [0, 0],
        [0, 0],
    ];
    const cDebtToIncome = [0, 0];
    const publicSignalsDebtToIncome = [1]; // Example public signal

    // Repeat for other inputs
    const aTransactionHistory = [0, 0];
    const bTransactionHistory = [
        [0, 0],
        [0, 0],
    ];
    const cTransactionHistory = [0, 0];
    const publicSignalsTransactionHistory = [1];

    const aWalletAge = [0, 0];
    const bWalletAge = [
        [0, 0],
        [0, 0],
    ];
    const cWalletAge = [0, 0];
    const publicSignalsWalletAge = [1];

    const aWalletBalance = [0, 0];
    const bWalletBalance = [
        [0, 0],
        [0, 0],
    ];
    const cWalletBalance = [0, 0];
    const publicSignalsWalletBalance = [1];

    // Call the function
    const tx = await contract.verifyAndCalculateCreditScore(
        aDebtToIncome,
        bDebtToIncome,
        cDebtToIncome,
        publicSignalsDebtToIncome,
        aTransactionHistory,
        bTransactionHistory,
        cTransactionHistory,
        publicSignalsTransactionHistory,
        aWalletAge,
        bWalletAge,
        cWalletAge,
        publicSignalsWalletAge,
        aWalletBalance,
        bWalletBalance,
        cWalletBalance,
        publicSignalsWalletBalance
    );

    console.log("Transaction Hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction Mined:", receipt);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
