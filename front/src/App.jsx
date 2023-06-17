import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [tx, setTx] = useState();
  const [balance, setBalance] = useState();

  const setAccountAsync = async () => {
    const handleSetAccount = (accounts) => {
      setAccount(accounts[0]);
    };
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    handleSetAccount(accounts);
    window.ethereum.on("accountsChanged", handleSetAccount);
    return () =>
      window.ethereum.removeListener("accountsChanged", handleSetAccount);
  };

  useEffect(() => {
    setAccountAsync();
  }, []);

  const getBalance = useCallback(async () => {
    if (account) {
      const response = await fetch(`http://localhost:3333/balance/${account}`);
      const json = await response.json();
      setBalance(json.balance);
    } else {
      setBalance(0);
    }
  }, [account]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const getFaucet = async () => {
    setTx(null);
    const response = await fetch(`http://localhost:3333/faucet/${account}`);
    const json = await response.json();
    setTx(json);
    getBalance();
  };

  return (
    <>
      <h1>Faucet</h1>
      <h3>Saldo: {balance}</h3>
      <p>Cuenta: {account}</p>
      <button onClick={getFaucet}>Send 0.1</button>
      <div>{tx && "Transaction Successful!"}</div>
    </>
  );
}

export default App;
