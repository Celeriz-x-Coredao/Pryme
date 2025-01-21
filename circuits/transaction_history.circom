pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template TransactionHistoryVerifier() {
    signal input transactionCount;
    signal input minTransactions;
    signal output isEligible;

    // Use GreaterEqThan component for comparison
    component geq = GreaterEqThan(252);
    geq.in[0] <== transactionCount;
    geq.in[1] <== minTransactions;

    // Assign the comparison result to output
    isEligible <== geq.out;
}

component main = TransactionHistoryVerifier();
