const enumerable = require("linq");
const Caver = require("caver-js");
const Config = require("./config").getConfig();
const FileHelper = require("./file-helper");
const Parameters = require("./parameters").get();

const caver = new Caver(new Caver.providers.HttpProvider((Config || {}).provider || "http://localhost:8545"));

const findTypeFromCache = (cache, wallet) => {
  if (cache && cache.length) {
    for (const entry of cache) {
      if (entry.wallet === wallet) {
        return entry.type;
      }
    }
  }

  return null;
};

module.exports.addType = async balances => {
  if (!Config.checkIfContract) {
    return balances;
  }

  let counter = 0;
  let cache = await FileHelper.parseFile(Parameters.knownTypes);

  for await (const balance of balances) {
    counter++;
    let type = findTypeFromCache(cache, balance.wallet);
    if (!type) {
      type = "wallet";

      const code = await caver.klay.getCode(balance.wallet);

      if (code != "0x") {
        type = "contract";
        console.log("✓", balance.wallet, "is a contract.");
      }
    }

    balance.type = type;
  }

  const knownTypes = enumerable
    .from(balances)
    .select(x => {
      return { wallet: x.wallet, type: x.type };
    })
    .toArray();

  await FileHelper.writeFile(Parameters.knownTypes, knownTypes);

  return enumerable
    .from(balances)
    .orderBy(x => x.type)
    .thenByDescending(x => parseFloat(x.balance))
    .toArray();
};
