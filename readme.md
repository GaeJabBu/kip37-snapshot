# Token Snapshot: Create KIP37 Token Snapshot

> Forked from [erc721-snapshot](https://github.com/0xSlot/erc721-snapshot)

This command-line utility creates a snapshot of any KIP37 token in JSON or CSV format. Use your own fully synced Ethereum node or any Klaytn RPC

### **CAUTION**

- when editing `snapshot.config.json`, delete the `./tx/{target symbol}` folder and take a snapshot again.
- csv output is not recommended. I look forward to your contributions to a better way of outputting.
- Not fully tested on Klaytn. Be careful to check the results before use.

### CLI Arguments

None. Prompts for user input and produces a configuration file on the first run.

### How to Use Token Snapshot?

Navigate to a directory where you'd like to save the token snapshot to.

```
cd path/to/a/directory
```

Run the program:

```
kip37-snapshot
```

## Configuration File / Prompt Parameters
To avoid getting prompted for each configuration parameters, each time `kip37-snapshot` is ran, have a `./snapshot.config.json` file at the same location as `kip37-snapshot` is executed.

```json
{
  "provider": "https://public-node-api.klaytnapi.com/v1/cypress",
  "contractAddress": "",
  "fromBlock": 0,
  "toBlock": "latest",
  "format": "json",
  "blocksPerBatch": 2500,
  "delay": 500,
  "checkIfContract": true
}
```

### provider

Enter your fully synced Klaytn node. Could be a local node or remote RPC services

### contractAddress

Address of your KIP-37 contract.

### fromBlock

The block height to scan from. To save time, enter the block number of the transaction your token was created on.

### toBlock

The block height to end the scan at.

### blocksPerBatch

The number of blocks to query per batch.

If you are using remote service like Infura, keep this number relative low (2000-5000) to avoid rate limits. If you are using a dedicated Ethereum node, you can increase this number to suit your needs.

### delay

The delay (in ms) between each request in the loop. Tweak this if you are experiencing rate limit from your provider.

### checkIfContract

Checks each address to determine whether it is a smart contract or an Ethereum wallet.
*Not verified by Klaytn.

## You May Also Like

- [Vyper ERC20 Contracts](https://github.com/binodnp/vyper-erc20)
- [Vyper Crowdsale Contracts](https://github.com/binodnp/vyper-crowdsale)
- [Solidoc: Solidity Documentation Generator](https://github.com/CYBRToken/solidoc)
- [SolFlattener: Solidity Flattener](https://github.com/CYBRToken/sol-flattener)
- [Vesting Schedule](https://github.com/binodnp/vesting-schedule)
