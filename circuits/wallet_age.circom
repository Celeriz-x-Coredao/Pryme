pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template WalletAgeVerifier() {
    signal input walletCreationTimestamp;  // Wallet creation timestamp
    signal input currentTimestamp;         // Current timestamp
    signal input minAgeInMonths;          // Required minimum age in months
    signal output isEligible;             // Boolean result

    // Calculate time difference in seconds
    signal timeDifference;
    timeDifference <== currentTimestamp - walletCreationTimestamp;

    // Convert to months (30 days = 2592000 seconds)
    signal walletAgeInMonths;
    walletAgeInMonths <== timeDifference / 2592000;

    // Compare wallet age with minimum required age
    component gt = GreaterEqThan(252);
    gt.in[0] <== walletAgeInMonths;
    gt.in[1] <== minAgeInMonths;

    // Set the output
    isEligible <== gt.out;
}

component main = WalletAgeVerifier();
