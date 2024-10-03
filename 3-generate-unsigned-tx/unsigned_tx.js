const { ethers } = require('ethers');
require('dotenv').config();
const crypto = require('crypto');

// Variáveis de ambiente
const tokenAddress = process.env.TOKEN_ADDRESS.trim().toLowerCase();
const fromAddress = process.env.FROM_WALLET_ADDRESS.trim().toLowerCase();
const toAddress = process.env.TO_WALLET_ADDRESS.trim().toLowerCase();
const nodeHttpsUrl = process.env.ETH_NODE_HTTPS_URL;

// Conexão com a Rede Blockchain
const provider = new ethers.providers.JsonRpcProvider(nodeHttpsUrl);

// ABI do Contrato
const tokenABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];

// Valor a ser transferido (em unidades do token, não wei)
const amount = ethers.utils.parseUnits('0.001', 'ether');

const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

// Função para obter a taxa de gás da rede atualmente
const getGasPrice = async () => {
  try {
    const gasPrice = await provider.getGasPrice();
    console.log('Preço atual do gás em wei:', gasPrice.toString());

    // Convertendo o preço do gás para gwei
    const gasPriceInGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
    console.log('Preço atual do gás em gwei:', gasPriceInGwei);
    return gasPrice;
  } catch (error) {
    console.error('Erro ao obter o preço do gás:', error);
  }
};

const unsignedTx = async () => {
  try {
    // Obtenha o preço do gás
    const gasPrice = await getGasPrice();

    // Estimar o limite de gás
    const gasLimit = await tokenContract.estimateGas.transfer(toAddress, amount, { from: fromAddress });

    // Obtenha o nonce para a transação
    const nonce = await provider.getTransactionCount(fromAddress, 'latest');

    // Crie o objeto de transação
    const tx = {
      //from: fromAddress, // NÃO PODE TER O CAMPO FROM
      to: tokenAddress,
      nonce: nonce,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      data: tokenContract.interface.encodeFunctionData('transfer', [toAddress, amount])
    };

    // Serializar a transação sem assinar
    const serializedTx = ethers.utils.serializeTransaction(tx);
    console.log('Transação não assinada: ', serializedTx)

    // Gera o hash sha256 da transação serializada
    const sha256Hash = crypto.createHash('sha256').update(serializedTx).digest('hex');
    console.log('SHA256 da transação não assinada:', sha256Hash);

    return {
      "serializedTx": serializedTx,
      "sha256Hash": sha256Hash
    }

  } catch (error) {
    console.error('Erro ao gerar a transação:', error);
  }
};

unsignedTx();
