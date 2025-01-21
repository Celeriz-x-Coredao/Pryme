pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template WalletBalanceVerifier(n) {
    // n is the number of wallets
    signal input wallets[n];  // array of wallet balances
    signal input threshold;   // threshold to compare against
    signal output isEligible; // boolean output

    // Signal for storing the sum
    signal sum;
    var tempSum = 0;

    // Calculate sum of all wallet balances
    for (var i = 0; i < n; i++) {
        tempSum += wallets[i];
    }
    sum <== tempSum;

    // Compare sum with threshold
    component gt = GreaterThan(252);
    gt.in[0] <== sum;
    gt.in[1] <== threshold;

    // Set output
    isEligible <== gt.out;
}

// Example with 3 wallets
component main = WalletBalanceVerifier(3);
