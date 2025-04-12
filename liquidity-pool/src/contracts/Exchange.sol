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

    function addLiquidity() public {
        //adds liquidity and receives tokens
        /*
        make sure the user approved to move the tokens
        calculate how much needs to be minted based on LP size
        mint back to user so they know how much they own
        add to reserves
        */
    }
    function removeLiquidity() public {
        //removes and burns liquidity pool tokens
        /*
    check if user has enough to burn first, if not error check
    get back the correct amount of tokens A and B and update the LP
    
    */
    }
    //swap functions with AMM formula
    /*
        check for approval first, transfer the token in
        then calculate percentage of other token to exchange
        transfer then update reserves
    */
}
