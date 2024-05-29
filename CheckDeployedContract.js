const ChainPort = require("./ChainPort");
const { Network } = require("alchemy-sdk");

const chainPort = new ChainPort();

chainPort.getContractsDeployed([
    { address: "0xBEC63A2C6536264eCBFA79Aed10FC20FA5Ddc855", network: Network.MATIC_MAINNET, fromBlock: 40970656 },
    { address: "0xa4F07F05a3AcB12A17934017f1644c55AC3CebAb", network: Network.MATIC_AMOY, fromBlock: 0 },
    { address: "0xa4F07F05a3AcB12A17934017f1644c55AC3CebAb", network: Network.ETH_SEPOLIA, fromBlock: 5112150 }])
    .then(results => console.log(results))
    .catch(error => console.error(error));
