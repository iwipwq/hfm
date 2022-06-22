const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("펀딩금액 인출 중...");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("모든 금액을 인출했습니다!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
