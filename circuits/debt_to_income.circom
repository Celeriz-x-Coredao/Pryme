pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template DebtToIncomeVerifier() {
    signal input debt;        // User's total debt
    signal input income;      // User's total income
    signal input maxRatio;    // Maximum allowed debt-to-income ratio
    signal output isEligible; // Boolean result

    // To avoid division, multiply maxRatio by income and compare with debt
    signal maxAllowedDebt;
    maxAllowedDebt <== income * maxRatio;

    // Compare debt with maximum allowed debt
    component leq = LessEqThan(252);
    leq.in[0] <== debt;
    leq.in[1] <== maxAllowedDebt;

    // Set eligibility output
    isEligible <== leq.out;
}

component main = DebtToIncomeVerifier();
