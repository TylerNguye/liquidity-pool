// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

//TODO This contract should define the math related to AMM 

// Define a contract named AutomatedMarketMaker
contract AutomatedMoneyMaker {
   // Declare a public state variable to store the value
   uint256 public value;
   int256 private constant K = 50;
   int256 public currencyBalance1;
   int256 public currencyBalance2;


   // Function to increment the value by a given amount
    function currency1UpdateBalance(int256 curr2Diff) public {
        require(curr2Diff <= currencyBalance2);
        int256 newCurrencyBalance1 = K / (currencyBalance2 - curr2Diff);
    }

    function currency2UpdateBalance(int256 curr1Diff) public {
        require(curr1Diff <= currencyBalance1);
        int256 newCurrencyBalance2 = K / (currencyBalance1 - curr1Diff);
    }

    function currencyUpdateBase(int256 x, int256 y) private {
    }

    function currencyUpdateBalances(int256 curr1Diff, int256 curr2Diff) public {
        currency1UpdateBalance(curr2Diff);
        currency2UpdateBalance(curr1Diff);
    }
}
