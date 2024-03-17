// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasPaidTransfer {
    event Transfer(address indexed from, address indexed to, uint256 amount);

    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        uint256 gasStart = gasleft();
        emit Transfer(msg.sender, to, amount);
        uint256 gasUsed = gasStart - gasleft();

        uint256 gasCost = gasUsed * tx.gasprice;
        require(balances[to] >= gasCost, "Insufficient balance to pay gas");
        balances[to] -= gasCost;
        payable(tx.origin).transfer(gasCost);
    }
}