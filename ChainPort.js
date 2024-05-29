require("dotenv").config();
const getDeployedContracts = require("./ContractDeployed");
const getCNFTsforCollection = require('./CNFT');
const { Network } = require("alchemy-sdk");

class ChainPort {
 
    getApiKey(network) {
        switch (network) {
            case Network.ETH_MAINNET:
                return process.env.MAINNET;
            case Network.ETH_SEPOLIA:
                return process.env.SEPOLIA;
            case Network.MATIC_MAINNET:
                return process.env.POLYGON;
            case Network.MATIC_AMOY:
                return process.env.AMOY; 
            case 'mainnet-beta':
                return process.env.SOLANA;
            default:
                throw new Error("Unsupported network or API key not set for network.");
        }
    }

    async getContractsDeployed(requests) {
        const results = [];
        for (const request of requests) {
            const { address, network,fromBlock } = request;
            const apiKey = this.getApiKey(network);
            if (!apiKey) {
                throw new Error(`API key for network ${network} is not set.`);
            }
            const deployedContracts = await getDeployedContracts(address, network, apiKey, fromBlock);
            results.push({ address, network, deployedContracts , contractDeployed : deployedContracts.length});
        }

        return results;
    }

    async getNumberofCNFT(requests) {
        const results = [];

        for (const request of requests) {
            const { address, network, collectionAddress } = request;
            const apiKey = this.getApiKey(network);
            if (!apiKey) {
                throw new Error(`API key for network ${network} is not set.`);
            }
            const CNFTs =await getCNFTsforCollection(address,network,apiKey,collectionAddress)
            results.push({nfts : JSON.stringify(CNFTs),total : CNFTs.length });
        }

        return results;
    }
}

module.exports = ChainPort;
