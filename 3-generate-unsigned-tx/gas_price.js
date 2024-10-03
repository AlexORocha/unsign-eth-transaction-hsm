const { Web3 } = require('web3');
require('dotenv').config();

// URL de acesso ao nó da rede blockchain
const nodeHttpsUrl = process.env.MY_NODE_HTTPS_URL; // Certifique-se de definir isso no seu arquivo .env

// Conexão com a Rede Blockchain
const web3 = new Web3(nodeHttpsUrl);

const getGasPrice = async () => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Preço atual do gás em wei:', gasPrice.toString());

    // Convertendo o preço do gás para gwei
    const gasPriceInGwei = web3.utils.fromWei(gasPrice, 'gwei');
    console.log('Preço atual do gás em gwei:', gasPriceInGwei);
  } catch (error) {
    console.error('Erro ao obter o preço do gás:', error);
  }
};

getGasPrice();
