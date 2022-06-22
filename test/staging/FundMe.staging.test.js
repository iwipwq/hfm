const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("0.1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("기부가 가능하고 인출이 가능함", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw({ gasLimit: 100000 });
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        console.log(
          `withdraw를 실행시키고 난 후 계약에 남은 잔액: ${endingBalance}`
        );
        assert.equal(endingBalance.toString(), "0");
      });
    });
