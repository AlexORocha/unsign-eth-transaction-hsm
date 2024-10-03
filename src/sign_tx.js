const { ethers } = require('ethers');

function bufferToHex(buffer) {
    return '0x' + buffer.toString('hex');
}

async function forceTransactionSignature(unsignedTransactionHex, signatureHash) {
    // Obtém os elementos r, s e v da assinatura do HSM
    const signature = ethers.utils.splitSignature(signatureHash);
    const r = signature.r;
    const s = signature.s;
    const v = signature.v;

    // Deserializa a transação original utilizando ethers
    const unsignedTransaction = ethers.utils.parseTransaction(unsignedTransactionHex);

    // Serializa a transação com os parâmetros v, r, s
    const signedTx = ethers.utils.serializeTransaction(
        unsignedTransaction,
        { r, s, v }
      );

    return signedTx;
}

module.exports = forceTransactionSignature;
