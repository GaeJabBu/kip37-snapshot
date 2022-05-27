"use strict";
var BigNumber = require("bignumber.js");
const enumerable = require("linq");

module.exports.createBalances = async data => {
  const balances = new Map();
  const closingBalances = [];

  const setDeposits = event => {
    const wallet = event.to;

    let deposits = (balances.get(wallet) || {}).deposits || [];
    let withdrawals = (balances.get(wallet) || {}).withdrawals || [];

    if (!event.tokenId) {
      throw new TypeError('invalid tokenId value');
    }

    /*
      //특정 토큰 ID 범위를 제외하는 경우.

      if (parseInt(event.tokenId) < 2000) {
        console.log("제외:"+ event.tokenId)
      }else{
        deposits = [...deposits, event.tokenId];
        balances.set(wallet, { deposits, withdrawals });
      }
    */
    deposits = [...deposits, event.tokenId];
    balances.set(wallet, { deposits, withdrawals });
  };

  const setWithdrawals = event => {
    const wallet = event.from;

    let deposits = (balances.get(wallet) || {}).deposits || [];
    let withdrawals = (balances.get(wallet) || {}).withdrawals || [];

    if (!event.tokenId) {
      throw new TypeError('invalid tokenId value');
    }

    withdrawals = [...withdrawals, event.tokenId];
    balances.set(wallet, { deposits, withdrawals });
  };

  for (const event of data.events) {
    setDeposits(event);
    setWithdrawals(event);
  }

  for (const [key, value] of balances.entries()) {
    if (key === "0x0000000000000000000000000000000000000000") {
      continue;
    }

    let scores;
    
    scores = value.deposits.reduce(
      function (carrier, elem) {
        if(carrier[elem]?.deposits == null) {
          carrier[elem] = { deposits: 0, withdrawals: 0 }
        }
        carrier[elem].deposits += 1;
        return carrier;
      },
      {}
    )

    scores = value.withdrawals.reduce(
      function (carrier, elem) {
        carrier[elem].withdrawals += 1;
        return carrier;
      },
      scores
    )

    const tokenIds = Object.keys(scores).reduce(
      function(carrier, elem) {
        if(scores[elem].deposits > scores[elem].withdrawals) {
          carrier.push(elem);
        }
        return carrier;
      }, []
    )

    closingBalances.push({
      wallet: key,
      tokenIds,
      amount : tokenIds.length
    });
  }

  return closingBalances.filter(b => b.tokenIds.length > 0);
};
