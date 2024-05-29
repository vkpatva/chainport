const axios = require('axios')
async function getCNFTsforCollection(wallet,network,apiKey,collectionAddress) {
    const response = await axios.get(`https://api.shyft.to/sol/v1/nft/compressed/read_all?network=${network}&wallet_address=${wallet}`,{
        headers: {
            "x-api-key": apiKey
        }
    });
    const filteredNFTs = response.data.result.nfts.filter(nft => nft.collection.address === collectionAddress);
    return filteredNFTs
}

module.exports = getCNFTsforCollection;
