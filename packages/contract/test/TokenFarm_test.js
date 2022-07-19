const DappToken = artifacts.require(`DappToken`)
const DaiToken = artifacts.require(`DaiToken`)
const TokenFarm = artifacts.require(`TokenFarm`)

const { assert } = require('chai')
require('chai').use(require('chai-as-promised')).should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm

  before(async () => {
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    await daiToken.transfer(investor, tokens('100'), { from: owner })
  })
  // DaiToken
  describe('Mock DAI deployment', async () => {
    // test1
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  // DappToken
  describe('Dapp Token deployment', async () => {
    // test2

    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name, 'Dapp Token')
    })
  })

  // TokenFarm
  describe('Token Farm deployment', async () => {
    // test3
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Dapp Token Farm')
    })

    // test4
    it('contract has tokens', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
      let result
      // test 5
      result = await daiToken.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens('100'),
        'incestor Mock DAI wallet balance correct befor staking'
      )

      // test6
      await daiToken.approve(tokenFarm.address, tokens('100'), {
        from: investor,
      })
      await tokenFarm.stakeTokens(tokens('100'), { from: investor })

      // test7
      result = await daiToken.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens('0'),
        'investor Mock DAI wallet balance correct after staking'
      )

      // test8
      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(
        result.toString(),
        tokens('100'),
        'Token Farm Mock DAI balance correct after staking'
      )

      // test9
      result = await tokenFarm.stakingBalance(investor)
      assert.equal(
        result.toString(),
        tokens('100'),
        'investor staking balance correct after staking'
      )

      // test10
      result = await tokenFarm.isStaking(investor)
      assert.equal(
        result.toString(),
        'true',
        'investor staking status correct after staking'
      )

      await tokenFarm.issueTokens({ from: owner })

      result = await dappToken.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens('100'),
        'investor DApp Token wallet balance correct after staking'
      )

      await tokenFarm.issueTokens({ from: investor }).should.be.rejected

      await tokenFarm.unstakeTokens({ from: investor })

      // test11
      result = await daiToken.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens('100'),
        'investor Mock DAI wallet balance correct after staking'
      )

      // test12
      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(
        result.toString(),
        tokens('0'),
        'Token Farm Mock DAI balance correct after staking'
      )

      // test13
      result = await tokenFarm.stakingBalance(investor)
      assert.equal(
        result.toString(),
        tokens('0'),
        'investor staking status correct after staking'
      )

      // test14
      result = await tokenFarm.isStaking(investor)
      assert.equal(
        result.toString(),
        'false',
        'investor staking status correct after staking'
      )
    })
  })
})
