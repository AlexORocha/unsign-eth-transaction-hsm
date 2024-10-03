const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const nodeHttpsUrl = process.env.ETH_NODE_HTTPS_URL;

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        privateKeys=[privateKey],
        providerOrUrl=nodeHttpsUrl
      ),
      network_id: '*',
      gas: 4500000,
      gasPrice: 153316979220
    }
  },
  compilers: {
    solc: {
      version: "0.8.26"
    }
  }
};
