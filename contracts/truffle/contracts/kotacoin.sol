// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Kotacoin is ERC20 {
    constructor() ERC20("Worldcoin", "KOTA") {
        uint256 initialSupply = 100000000000000000000000000;
        _mint(msg.sender, initialSupply);
    }
}
