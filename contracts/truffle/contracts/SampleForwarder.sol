// SPDX-License-Identifier: MiT
pragma solidity <0.9.0;

import "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";

contract SampleForwarder is ERC2771Forwarder {
    constructor(string memory name) ERC2771Forwarder(name) {}
}
