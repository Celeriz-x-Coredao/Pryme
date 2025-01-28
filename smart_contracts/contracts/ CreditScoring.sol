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


    event CreditScoreCalculated(address indexed user, uint256 creditScore);

    constructor(
        address _debtToIncomeVerifier;
       
    ) {
        debtToIncomeVerifier = IVerifier(_debtToIncomeVerifier);
       
    }

    function verifyAndCalculateCreditScore(
        // Debt-to-Income proof
        uint256[2] memory aDebtToIncome,
        uint256[2][2] memory bDebtToIncome,
        uint256[2] memory cDebtToIncome,
        uint256[1] memory publicSignalsDebtToIncome, // Adjusted type

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

        // Calculate Credit Score
        uint256 creditScore = calculateCreditScore(
            publicSignalsDebtToIncome,
           
        );

        emit CreditScoreCalculated(msg.sender, creditScore);
    }

    function calculateCreditScore(
        uint256[1] memory publicSignalsDebtToIncome,
       
    ) internal pure returns (uint256) {
        uint256 score = 0;

        // Example scoring logic
        if (publicSignalsDebtToIncome[0] == 1) score += 25;
       

        return score;
    }
}
