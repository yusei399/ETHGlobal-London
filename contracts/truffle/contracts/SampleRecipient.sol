// SPDX-License-Identifier: MiT
pragma solidity <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract SampleRecipient is ERC20, Ownable, ERC2771Context {
    constructor(
        string memory name,
        string memory symbol,
        address trustedForwarder
    )
        ERC20(name, symbol)
        Ownable(msg.sender)
        ERC2771Context(trustedForwarder)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address)
    {
        return super._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }
}
