const { SynthetixJs } = require('synthetix-js');
const { providers } = require('ethers');

const ETHEREUM_NETWORK = 'homestead';

const provider = new providers.InfuraProvider(
  ETHEREUM_NETWORK,
  process.env.INFURA_PROJECT_ID
);

let snxJSConnector = {
  initialized: false,
  init: function () {
    this.initialized = true;
    this.snxJS = new SynthetixJs({
      provider,
      networkId: provider.network.chainId,
    });
    this.synths = this.snxJS.contractSettings.synths;
  },
};
module.exports = snxJSConnector;
