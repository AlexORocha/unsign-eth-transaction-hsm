const unsignTx = require('./src/unsign_tx');
const signSha256Transaction = require('./src/sign_sha256_tx');
const forceTransactionSignature = require('./src/sign_tx');

require('dotenv').config();

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS
const FROM_WALLET_ADDRESS = process.env.FROM_WALLET_ADDRESS
const TO_WALLET_ADDRESS = process.env.TO_WALLET_ADDRESS

async function __main__() {
    // Gera a Transação não assinada
    const { unsignedTx, signedTx_, txHash } = await unsignTx(FROM_WALLET_ADDRESS, TO_WALLET_ADDRESS, '1', TOKEN_ADDRESS);

    // Assina o SHA256 da Transação
    const hashSigned = await signSha256Transaction(txHash);

    // Assina a transação com os parâmetros v, r, s
    const signedTx = await forceTransactionSignature(unsignedTx, hashSigned);
    
    console.log(signedTx_)
    console.log(signedTx)
    console.log(signedTx_ === signedTx)
}

__main__()