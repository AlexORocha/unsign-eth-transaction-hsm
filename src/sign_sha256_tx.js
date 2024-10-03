const { ethers } = require('ethers');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

async function signSha256Transaction(transactionHash) {
  const wallet = new ethers.Wallet(PRIVATE_KEY);

  const signature = await wallet.signMessage(ethers.utils.arrayify(transactionHash))
  
  return signature; // O HSM retornaria esta assinatura
}

module.exports = signSha256Transaction;