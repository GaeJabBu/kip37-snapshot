# Token Snapshot: Create KIP37 Token Snapshot

> Forked from [erc721-snapshot](https://github.com/0xSlot/erc721-snapshot)

This command-line utility creates a snapshot of any KIP37 token in JSON or CSV format. Use your own fully synced Ethereum node or any Klaytn RPC

### CLI Arguments

None. Prompts for user input and produces a configuration file on the first run.

### How to Use Token Snapshot?

Navigate to a directory where you'd like to save the token snapshot to.

```
cd path/to/a/directory
```

Run the program:

```
erc721-snapshot
```

## Configuration File / Prompt Parameters
To avoid getting prompted for each configuration parameters, each time `erc721-snapshot` is ran, have a `./snapshot.config.json` file at the same location as `erc721-snapshot` is executed.

```json
{
  "provider": "https://public-node-api.klaytnapi.com/v1/cypress",
  "contractAddress": "",
  "fromBlock": 0,
  "toBlock": "latest",
  "format": "json",
  "blocksPerBatch": 2500,
  "delay": 0,
  "checkIfContract": true
}
```

### provider

Enter your fully synced Ethereum node. Could be a local node or remote services like Infura.

### contractAddress

Address of your ERC721 contract.

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

## You May Also Like

- [Vyper ERC20 Contracts](https://github.com/binodnp/vyper-erc20)
- [Vyper Crowdsale Contracts](https://github.com/binodnp/vyper-crowdsale)
- [Solidoc: Solidity Documentation Generator](https://github.com/CYBRToken/solidoc)
- [SolFlattener: Solidity Flattener](https://github.com/CYBRToken/sol-flattener)
- [Vesting Schedule](https://github.com/binodnp/vesting-schedule)
