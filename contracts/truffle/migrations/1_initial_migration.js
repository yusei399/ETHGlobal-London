const RateRecorder = artifacts.require("RateRecorder");

module.exports = function(deployer) {
    deployer.deploy(RateRecorder);
};

// konaito@konaito:~/Documents/ETHGlobal-London/contract/truffle$ truffle migrate --network op_sepolia

// Compiling your contracts...
// ===========================
// > Compiling ./contracts/RateRecorder.sol
// > Artifacts written to /home/konaito/Documents/ETHGlobal-London/contract/truffle/build/contracts
// > Compiled successfully using:
//    - solc: 0.8.21+commit.d9974bed.Emscripten.clang


// Starting migrations...
// ======================
// > Network name:    'op_sepolia'
// > Network id:      11155420
// > Block gas limit: 30000000 (0x1c9c380)


// 1_initial_migration.js
// ======================

//    Deploying 'RateRecorder'
//    ------------------------
//    > transaction hash:    0xe481a03402512d4850d5880381893d2b3a81ecf427a2344630be21bf89249bc5
//    > Blocks: 0            Seconds: 0
//    > contract address:    0x7FF88E201526bC9899fbf6aD5aa49d0E71834a90
//    > block number:        9402302
//    > block timestamp:     1710607144
//    > account:             0x4F5d2d4b0468102301d340B35155D3F1a0FB0E76
//    > balance:             0.051897602662126426
//    > gas used:            318104 (0x4da98)
//    > gas price:           0.015 gwei
//    > value sent:          0 ETH
//    > total cost:          0.00000477156 ETH

//    > Saving artifacts
//    -------------------------------------
//    > Total cost:       0.00000477156 ETH

// Summary
// =======
// > Total deployments:   1
// > Final cost:          0.00000477156 ETH