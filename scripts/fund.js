const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {deployer} = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe",deployer);
    console.log("계약에 펀딩중...");
    const sendValue = ethers.utils.parseEther("0.1");
    const transactionResponse = await fundMe.fund({value: sendValue});
    await transactionResponse.wait(1);
    console.log("펀딩 완료되었습니다!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
