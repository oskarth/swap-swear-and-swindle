var ERC20PresetMinterPauser = artifacts.require("ERC20PresetMinterPauser")
var SimpleSwapFactory = artifacts.require('./SimpleSwapFactory.sol')

module.exports = async function(deployer) {
    const erc20 = await deployer.deploy(ERC20PresetMinterPauser, "TestToken", "TEST")
    const done = await ERC20PresetMinterPauser.deployed()

    // This works, would like to interact with it
    await deployer.deploy(SimpleSwapFactory, ERC20PresetMinterPauser.address)
}
