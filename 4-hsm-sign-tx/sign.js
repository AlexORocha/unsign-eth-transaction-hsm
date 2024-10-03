const { ethers } = require('ethers');
require('dotenv').config();

async function signSha256Transaction(transactionHash, privateKey) {
    // Cria uma wallet a partir da chave privada
    const wallet = new ethers.Wallet(privateKey);
    
    // Assina o hash da transação (deve ser um hash de 32 bytes)
    const signature = await wallet.signMessage(ethers.utils.arrayify(transactionHash));

    return signature;
}

// Exemplo de uso
const transactionHash = '0x1e54d4c83934000cf3c31e8e4750735c00bde3c7c72236999a4e4403fe5c0901'  // O hash SHA256 da transação (em formato hexadecimal)
const privateKey = process.env.PRIVATE_KEY  // Sua chave privada (em formato hexadecimal)

signSha256Transaction(transactionHash, privateKey)
    .then(signedTransaction => {
        console.log('Assinatura:', signedTransaction);
    })
    .catch(err => {
        console.error('Erro ao assinar a transação:', err);
    });
