const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AutomatedMoneyMaker", function () {
  let amm;
  // Define WAD and FEE for our test calculations (must match the contract)
  const WAD = ethers.BigNumber.from("1000000000000000000"); // 1e18
  const FEE = 200;

  beforeEach(async function () {
    const AMMFactory = await ethers.getContractFactory("AutomatedMoneyMaker");
    amm = await AMMFactory.deploy();
    await amm.deployed();
  });

  it("should calculate the correct output token amount", async function () {
    // Define test inputs.
    // Use small numbers for token amounts to avoid underflow via fixed-point scaling.
    const token1Balance = 10; // unscaled
    const token1Change = 5;   // unscaled

    const kStr = "30000000000000000000000000000000000000"; // 30e36
    const kBN = ethers.BigNumber.from(kStr);

    // Expected calculations:
    // newToken1Balance = 15 * WAD = 15e18.
    // totalToken2Output = k / newToken1Balance = 30e36 / 15e18 = 2e18.
    // fee = (totalToken2Output / WAD) * FEE = (2e18 / 1e18) * 200 = 2 * 200 = 400.
    // Final output = (2e18 - 400) / WAD.
    // Since 2e18 is 2000000000000000000, subtracting 400 gives 1999999999999999600.
    // Integer division by 1e18 floors the result to 1.
    const expectedOutput = 1;

    // Call the updatePoolBalance function.
    const result = await amm.updatePoolBalance(token1Balance, token1Change, kBN);

    // Compare the result to the expected output.
    expect(result).to.equal(expectedOutput);
  });
});
