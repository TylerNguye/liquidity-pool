// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AutomatedMarketMaker.sol";
import "./LiquidToken.sol";

//TODO: This contract should define a way for users to deposit and withdraw (similar to HW1) from the liquidity pool

// Define a contract named Exchange
contract Exchange {
    // Declare a public state variable to store the value
    IERC20 public tokenA;
    IERC20 public tokenB;
    AutomatedMarketMaker public amm;
    LiquidToken public lpToken;

    uint256 public reserveA;
    uint256 public reserveB;

    uint256 public value;

    function setUp(address _tokenA, address _tokenB, address _amm) public {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        amm = AutomatedMarketMaker(_amm);
        lpToken = new LiquidToken(0);
    }
    
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

    function addLiquidity(uint256 amountA, uint256 amountB) public {
        //adds liquidity and receives tokens
        /*
        make sure the user approved to move the tokens
        calculate how much needs to be minted based on LP size
        mint back to user so they know how much they own
        add to reserves

        require(make sure it's approved, error if not)

        if(total == 0) {
            liquidity = amountA
        } else {
            liquidityA/B = (amount A/B + total) / reserve A/B
            use the smaller of the two
        }

        token.mint(msg.sender, liquidity)

        reserveA/B += amountA/B
        */
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        uint256 totalSupply = lpToken.totalSupply();
        uint256 liquidity;

        if (totalSupply == 0) {
            liquidity = amountA;
        } else {
            uint256 liquidityFromA = (amountA * totalSupply) / reserveA;
            uint256 liquidityFromB = (amountB * totalSupply) / reserveB;

        if (liquidityFromA < liquidityFromB) {
            liquidity = liquidityFromA;
        } else {
                liquidity = liquidityFromB;
            }
}

        lpToken._mint(msg.sender, liquidity);

        reserveA += amountA;
        reserveB += amountB;
    }
    function removeLiquidity(uint256 lpAmount) public {
        //removes and burns liquidity pool tokens
        /*
    check if user has enough to burn first, if not error check
    get back the correct amount of tokens A and B and update the LP
    require(amount > 0, "invalid number")
    require(token.balance(msg.sender) >= lpAmount, "not enough tokens")

    amountA = (lpamount * reserveA) / total
    same for B

    token.burn(msg.sender, amount)

    require(transfer failed error check)

    reserveA/B = amount A/B
    */
    uint256 totalSupply = lpToken.totalSupply();

        uint256 amountA = (lpAmount * reserveA) / totalSupply;
        uint256 amountB = (lpAmount * reserveB) / totalSupply;

        lpToken._burn(msg.sender, lpAmount);

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        reserveA -= amountA;
        reserveB -= amountB;
    }
    //swap functions with AMM formula
    /*
        check for approval first, transfer the token in
        then calculate percentage of other token to exchange
        transfer then update reserves
    */
    function swapAforB(uint256 amountIn) public {
        tokenA.transferFrom(msg.sender, address(this), amountIn);

        int256 product = int256(reserveA) * int256(reserveB);
        int256 tokenOut = amm.updatePoolBalance(int256(reserveA), int256(amountIn), product);

        tokenB.transfer(msg.sender, uint256(tokenOut));

        reserveA += amountIn;
        reserveB -= uint256(tokenOut);
    }
    function swapBforA(uint256 amountIn) public {
        tokenB.transferFrom(msg.sender, address(this), amountIn);

        int256 product = int256(reserveA) * int256(reserveB);
        int256 tokenOut = amm.updatePoolBalance(int256(reserveB), int256(amountIn), product);

        tokenA.transfer(msg.sender, uint256(tokenOut));

        reserveB += amountIn;
        reserveA -= uint256(tokenOut);
    }
}
