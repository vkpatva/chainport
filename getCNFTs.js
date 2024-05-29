const ChainPort = require("./ChainPort");

const chainPort = new ChainPort();

chainPort.getNumberofCNFT([
    { address: "E98JhGGZ6uZaKADM6cJSBnn5b5maonDVFhfPFAGbSFi2", network: "mainnet-beta", collectionAddress: "FBDU9BiUpnzkorK8mS7swyPBrQGSTFv8ewJ8dYMGw7SY" }])
    .then(results => console.log(results))
    .catch(error => console.error(error));
