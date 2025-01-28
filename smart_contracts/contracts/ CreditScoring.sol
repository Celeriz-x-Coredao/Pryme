// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external view returns (bool);
}

contract CreditScoring {
    IVerifier public debtToIncomeVerifier;
    IVerifier public transactionHistoryVerifier;
    IVerifier public walletAgeVerifier;


    event CreditScoreCalculated(address indexed user, uint256 creditScore);

    constructor(
        address _debtToIncomeVerifier,
        address _transactionHistoryVerifier,
        address _walletAgeVerifier,

    ) {
        debtToIncomeVerifier = IVerifier(_debtToIncomeVerifier);
        transactionHistoryVerifier = IVerifier(_transactionHistoryVerifier);
        walletAgeVerifier = IVerifier(_walletAgeVerifier);
 
    }

    function verifyAndCalculateCreditScore(
        // Debt-to-Income proof
        uint256[2] memory aDebtToIncome,
        uint256[2][2] memory bDebtToIncome,
        uint256[2] memory cDebtToIncome,
        uint256[1] memory publicSignalsDebtToIncome, // Adjusted type

        // Transaction History proof
        uint256[2] memory aTransactionHistory,
        uint256[2][2] memory bTransactionHistory,
        uint256[2] memory cTransactionHistory,
        uint256[1] memory publicSignalsTransactionHistory, // Adjusted type

        // Wallet Age proof
        uint256[2] memory aWalletAge,
        uint256[2][2] memory bWalletAge,
        uint256[2] memory cWalletAge,
        uint256[1] memory publicSignalsWalletAge, // Adjusted type

     
    ) public {
        // Verify Debt-to-Income proof
        require(
            debtToIncomeVerifier.verifyProof(
                aDebtToIncome,
                bDebtToIncome,
                cDebtToIncome,
                publicSignalsDebtToIncome
            ),
            "Debt-to-Income verification failed"
        );

        // Verify Transaction History proof
        require(
            transactionHistoryVerifier.verifyProof(
                aTransactionHistory,
                bTransactionHistory,
                cTransactionHistory,
                publicSignalsTransactionHistory
            ),
            "Transaction History verification failed"
        );

        // Verify Wallet Age proof
        require(
            walletAgeVerifier.verifyProof(
                aWalletAge,
                bWalletAge,
                cWalletAge,
                publicSignalsWalletAge
            ),
            "Wallet Age verification failed"
        );

        

        // Calculate Credit Score
        uint256 creditScore = calculateCreditScore(
            publicSignalsDebtToIncome,
            publicSignalsTransactionHistory,
            publicSignalsWalletAge,
        
        );

        emit CreditScoreCalculated(msg.sender, creditScore);
    }

    function calculateCreditScore(
        uint256[1] memory publicSignalsDebtToIncome,
        uint256[1] memory publicSignalsTransactionHistory,
        uint256[1] memory publicSignalsWalletAge,
        uint256[1] memory publicSignalsWalletBalance
    ) internal pure returns (uint256) {
        uint256 score = 0;

        // Example scoring logic
        if (publicSignalsDebtToIncome[0] == 1) score += 25;
        if (publicSignalsTransactionHistory[0] == 1) score += 25;
        if (publicSignalsWalletAge[0] == 1) score += 25;
    

        return score;
    }
}
