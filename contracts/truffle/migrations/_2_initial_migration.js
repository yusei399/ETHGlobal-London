const MyContract = artifacts.require("GasPaidTransfer");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
