// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

//TODO: This contract should define a way for users to deposit and withdraw (similar to HW1) from the liquidity pool

// Define a contract named Exchange
contract Exchange {
   // Declare a public state variable to store the value
   uint256 public value;


   // Function to increment the value by a given amount
   // @param _value The amount to increment the value by
   function increment(uint256 _value) public {
       value += _value; // Add the input value to the current value
   }


   // Function to retrieve the current value
   // @return The current value of the state variable
   function getValue() public view returns (uint256) {
       return value; // Return the stored value
   }
}
