// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("LiquidToken", "LIQD") {
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}