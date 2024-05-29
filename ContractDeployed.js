const { Alchemy } = require("alchemy-sdk");

async function getDeployedContracts(address, network, apiKey,fromBlock) {
    const alchemy = new Alchemy({
        apiKey: apiKey,
        network: network,
    });

    const transfers = [];
    let response = await alchemy.core.getAssetTransfers({
        fromBlock,
        toBlock: "latest",
        fromAddress: address,
        excludeZeroValue: false,
        category: ["external"],
    });

    transfers.push(...response.transfers);

    while (response.pageKey) {
        const pageKey = response.pageKey;
        response = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: address,
            excludeZeroValue: false,
            category: ["external"],
            pageKey: pageKey,
        });
        transfers.push(...response.transfers);
    }

    const deployments = transfers.filter(transfer => transfer.to === null);
    const txHashes = deployments.map(deployment => deployment.hash);

    const promises = txHashes.map(hash => alchemy.core.getTransactionReceipt(hash));
    const receipts = await Promise.all(promises);
    return receipts.map(receipt => receipt?.contractAddress).filter(address => address != null);
}

module.exports = getDeployedContracts;
