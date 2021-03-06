const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const formatBalance = require('../util').formatBalance
const generateBalanceObject = require('../util').generateBalanceObject
const Tooltip = require('./tooltip.js')

module.exports = EthBalanceComponent

inherits(EthBalanceComponent, Component)
function EthBalanceComponent () {
  Component.call(this)
}

EthBalanceComponent.prototype.render = function () {
  var state = this.props
  var style = state.style
  var needsParse = this.props.needsParse !== undefined ? this.props.needsParse : true
  const value = formatBalance(state.value, 6, needsParse)
  var width = state.width

  return (

    h('.ether-balance.ether-balance-amount', {
      style: style,
    }, [
      h('div', {
        style: {
          display: 'inline',
          width: width,
        },
      }, this.renderBalance(value)),
    ])

  )
}
EthBalanceComponent.prototype.renderBalance = function (value) {
  var state = this.props
  if (value === 'None') return value
  var balanceObj = generateBalanceObject(value, state.shorten ? 1 : 3)
  var balance
  var splitBalance = value.split(' ')
  var ethNumber = splitBalance[0]
  var ethSuffix = splitBalance[1]

  if (state.shorten) {
    balance = balanceObj.shortBalance
  } else {
    balance = balanceObj.balance
  }

  var label = balanceObj.label

  return (
    h(Tooltip, {
      position: 'bottom',
      title: `${ethNumber} ${ethSuffix}`,
    }, [
      h('.flex-column', {
        style: {
          alignItems: 'flex-end',
          lineHeight: '13px',
          fontFamily: 'Montserrat Light',
          textRendering: 'geometricPrecision',
        },
      }, [
        h('div', {
          style: {
            width: '100%',
            textAlign: 'right',
          },
        }, this.props.incoming ? `+${balance}` : balance),
        h('div', {
          style: {
            color: ' #AEAEAE',
            fontSize: '12px',
          },
        }, label),
      ]),
    ])
  )
}
