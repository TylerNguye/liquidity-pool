// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

//TODO This contract should define the math related to AMM 

// Define a contract named AutomatedMarketMaker
contract AutomatedMoneyMaker {
    // Function to return the amount of output currency in pool
    // @param curr1Balance Amount of currency 1 in pool
    // @param curr1Change Integer amount of tokens that the user added/removed from the pool
    // @param k AMM constant
    // @return Amount of currency 2 in pool
    function currencyUpdate(int256 curr1Balance, int256 curr1Change, int256 k) public pure returns (int256) {
        return k / (curr1Balance + curr1Change);
    }
}
