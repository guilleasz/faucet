docker run -d -p 8545:8545 -p 30303:30303 \
  -v ${PWD}/data:/data \
  --name eth-node-01 \
    ethereum/client-go:v1.11.5 \
  --datadir data \
  --http --http.api personal,eth,miner,net,web3,rpc \
  --http.corsdomain="*" \
  --http.addr 0.0.0.0 \
  --http.port 8545 \
  --mine --miner.etherbase $WALLET_ADDRESS \
  --miner.threads 1
