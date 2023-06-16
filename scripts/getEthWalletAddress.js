const fs = require("fs");
const ethers = require("ethers");

const data = fs
  .readFileSync(
   process.env.DATA_PATH
  )
  .toString("utf-8");

  const wallet = ethers.Wallet.fromEncryptedJsonSync(data,process.env.WALLET_PASSWORD)

  console.log("privada", wallet.privateKey)
  console.log('address', wallet.address)
  console.log('public', wallet.publicKey)
