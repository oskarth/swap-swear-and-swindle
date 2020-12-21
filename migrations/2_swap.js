const {
  BN,
  balance,
  constants,
  expectEvent
} = require("@openzeppelin/test-helpers");
var ERC20PresetMinterPauser = artifacts.require("ERC20PresetMinterPauser")
var SimpleSwapFactory = artifacts.require('./SimpleSwapFactory.sol')
var ERC20SimpleSwap = artifacts.require('./ERC20SimpleSwap.sol')

module.exports = async function(deployer, network, accounts) {
    // Does this work as issuer?
    const issuer = accounts[0]
    const DEFAULT_HARDDEPOSIT_DECREASE_TIMEOUT = new BN(86400)

    await deployer.deploy(ERC20PresetMinterPauser, "TestToken", "TEST", {from: issuer})
    const erc20 = await ERC20PresetMinterPauser.deployed()

    await deployer.deploy(SimpleSwapFactory, ERC20PresetMinterPauser.address)
    const simpleSwapFactory = await SimpleSwapFactory.deployed()

    // XXX: Does it matter if deploy this or through deployer?
    // This will show up in logs but not contract
    // Then I get a return contract address 0x8455f1c518774d19c9c1649273d172318dd837a8
    let { logs } = await simpleSwapFactory.deploySimpleSwap(issuer, DEFAULT_HARDDEPOSIT_DECREASE_TIMEOUT)
    const ERC20SimpleSwapAddress = logs[0].args.contractAddress
    console.log("ERC20SimpleSwapAddress ", ERC20SimpleSwapAddress)
    //await ERC20SimpleSwap.at(ERC20SimpleSwapAddress)
}
