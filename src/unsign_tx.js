const { ethers } = require('ethers');

require('dotenv').config();

const nodeHttpsUrl = process.env.ETH_NODE_HTTPS_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY

// ABI default ERC-20
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

async function unsignTx(fromAddress, toAddress, amountTx, tokenAddress) {
  try {
    // Conexão com a Rede Blockchain
    const provider = new ethers.providers.JsonRpcProvider(nodeHttpsUrl);

    // Valor a ser transferido (em unidades do token, não wei)
    const amount = ethers.utils.parseUnits(amountTx, 'ether');

    // Cria o Contrato do Token
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

    // Estimar o limite de gás
    const gasLimit = await tokenContract.estimateGas.transfer(toAddress, amount, { from: fromAddress });

    // Obtenha o nonce para a transação
    const nonce = await provider.getTransactionCount(fromAddress, 'latest');

    // Obtém o gasPrice
    const gasPrice = await provider.getGasPrice();

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

    // Assinar a transação com a chave privada usando ethers.js para comparação final
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const signedTx = await wallet.signTransaction(tx);

    // Gera o hash sha256 da transação serializada
    const txnBytes = ethers.utils.arrayify(serializedTx)
    const transactionHash = ethers.utils.keccak256(txnBytes);

    return {
      "unsignedTx": serializedTx,
      "signedTx_": signedTx,
      "txHash": transactionHash
    }

  } catch (error) {
    console.error('Erro ao gerar a transação:', error);
  }
};

module.exports = unsignTx;