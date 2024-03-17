const GasPaidTransfer = artifacts.require("GasPaidTransfer");

contract("GasPaidTransfer", (accounts) => {
  let instance;

  before(async () => {
    instance = await GasPaidTransfer.deployed();
  });

  it("should deposit Ether", async () => {
    await instance.deposit({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    const balance = await instance.balances(accounts[0]);
    assert.equal(balance, web3.utils.toWei("1", "ether"));
  });

  it("should transfer Ether and pay gas from recipient's balance", async () => {
    await instance.deposit({ from: accounts[1], value: web3.utils.toWei("1", "ether") });
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await instance.transfer(accounts[1], web3.utils.toWei("0.5", "ether"), { from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    assert(finalBalance > initialBalance);
  });
});