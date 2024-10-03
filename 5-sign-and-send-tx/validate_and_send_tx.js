const { ethers } = require('ethers');
const rlp = require('rlp');

function bufferToHex(buffer) {
    return '0x' + buffer.toString('hex');
}

async function forceTransactionSignature(unsignedTransactionHex, signedTransactionHex) {
    // Divida a assinatura manualmente (assumindo que ela está em hexadecimal)
    const sig = signedTransactionHex.startsWith('0x') ? signedTransactionHex.slice(2) : signedTransactionHex;

    const r = '0x' + sig.slice(0, 64);  // primeiros 32 bytes
    const s = '0x' + sig.slice(64, 128); // próximos 32 bytes
    let v = parseInt(sig.slice(128, 130), 16);  // último byte como número inteiro

    // Normalização de v
    if (v < 27) {
        v += 27; // Ajuste de valor de v
    }

    // Deserializa a transação original (não assinada) utilizando RLP diretamente
    const decodedTransaction = rlp.decode(Buffer.from(unsignedTransactionHex.slice(2), 'hex'));

    // Construindo a transação com os parâmetros v, r, s
    const unsignedTransaction = {
        nonce: decodedTransaction[0] ? bufferToHex(decodedTransaction[0]) : '0x',
        gasPrice: decodedTransaction[1] ? bufferToHex(decodedTransaction[1]) : '0x',
        gasLimit: decodedTransaction[2] ? bufferToHex(decodedTransaction[2]) : '0x',
        to: decodedTransaction[3] && decodedTransaction[3].length > 0 ? '0x' + decodedTransaction[3].toString('hex') : null,
        value: decodedTransaction[4] ? bufferToHex(decodedTransaction[4]) : '0x',
        data: decodedTransaction[5] && decodedTransaction[5].length > 0 ? '0x' + decodedTransaction[5].toString('hex') : '0x',
        chainId: decodedTransaction[6] ? parseInt(decodedTransaction[6].toString('hex'), 16) : 1
    };


    // Serializa a transação original com os parâmetros v, r, s
    const signedTx = ethers.utils.serializeTransaction(unsignedTransaction, { v, r, s });


    return signedTx;
}


// Exemplo de uso
const unsignedTransactionHex = '0xf86601851e02066b3782ceec94aba4f467573e93a7348a9f0d650b71479967876080b844a9059cbb000000000000000000000000465763b0a6973737d97442ba6619b61287cf72db00000000000000000000000000000000000000000000000000038d7ea4c68000'; // Transação original em hexadecimal (não assinada)
const signedTransactionHex = '0x78cb6b7c924bde056e6f6313d9255339acb5a98de8cb379023cccf50c29053dc274b13bcee9dab7d4a18d31a03a1a54563710d0772c99f927323ade195332f4b1c';   // Transação assinada ou hash

forceTransactionSignature(unsignedTransactionHex, signedTransactionHex)
    .then(signedTx => {
        console.log('Transação assinada com v, r, s forçados:', signedTx);
    })
    .catch(err => {
        console.error('Erro ao forçar a assinatura da transação:', err);
    });
