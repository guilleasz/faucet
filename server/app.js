const { Web3 } = require("web3");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const web3 = new Web3("http://localhost:8545");
const app = express();

const json = JSON.parse(fs.readFileSync(process.env.DATA_PATH));

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.listen(3333);
app.use(cors());

app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await web3.utils.fromWei(
      (await web3.eth.getBalance(req.params.address)).toString(),
      "ether"
    );

    res.json({ balance });
  } catch (e) {
    console.error(e);
    res.status(404).send(e);
  }
});

app.get("/faucet/:address", async (req, res) => {
  const account = await web3.eth.accounts.decrypt(
    json,
    process.env.WALLET_PASSWORD
  );
  const tx = {
    chainId: 8888,
    to: req.params.address,
    from: account.address,
    gas: 30000,
    gasPrice: 3000,
    value: web3.utils.toWei("0.1", "ether"),
  };
  const txSigned = await account.signTransaction(tx);
  const response = await web3.eth.sendSignedTransaction(
    txSigned.rawTransaction
  );
  res.send(response);
});
