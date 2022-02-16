"use strict";

const Caver = require("caver-js");

const Config = require("./config").getConfig();
const Parameters = require("./parameters").get();

const caver = new Caver(new Caver.providers.HttpProvider((Config || {}).provider || "http://localhost:8545"));
const contractAddress = (Config || {}).contractAddress;

module.exports.getContract = () => {
  const contract = new caver.klay.Contract(Parameters.abi, contractAddress);
  return contract;
};
