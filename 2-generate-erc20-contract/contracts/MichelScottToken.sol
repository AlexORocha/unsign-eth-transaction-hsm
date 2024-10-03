// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MichaelScottToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MichaelScottToken", "MSCOT") {
        _mint(msg.sender, initialSupply);
    }
}