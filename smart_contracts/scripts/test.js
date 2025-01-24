const hre = require("hardhat");

async function main() {
    const signer = await hre.ethers.provider.getSigner();
    console.log(signer);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});