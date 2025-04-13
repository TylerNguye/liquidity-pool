// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

//TODO This contract should define the math related to AMM 

// Define a contract named AutomatedMarketMaker
contract AutomatedMoneyMaker {
    int256 FEE = 200;
    int256 WAD = 1e18;
    // Function to return the amount of output token in pool
    // @param curr1Balance Token 1 amount in pool
    // @param curr1Change Integer amount of tokens that the user added/removed from the pool
    // @param k AMM constant
    // @return Token 2 amount obtained by buyer
    function updatePoolBalance(int256 token1Balance, int256 token1Change, int256 k) public view returns (int256) {
        require(token1Balance >= 0, "This token's balance must be greater than 0.");
        int256 newToken1Balance = (token1Balance + token1Change) * WAD;
        int256 totalToken2Output = k / newToken1Balance;
        int256 fee = (totalToken2Output / WAD) * FEE;
        return (totalToken2Output - fee) / WAD;

    }
}

// k should be initialized as init x * init y

// 1.5 million
// 1 million