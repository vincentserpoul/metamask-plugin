const TokenABI = require('./abis/token.json')

module.exports = Token

function Token(address){

  var tokenContract = web3.eth.contract(TokenABI).at(address)
  return tokenContract

}