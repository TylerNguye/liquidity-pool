// src/components/Header.js
import React, { useState } from 'react';
import { Web3Provider as providers } from '@ethersproject/providers'

function Header({ setProvider, setSigner, setAccount }) {
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const provider = new providers(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        setAccount(account);
      } catch (err) {
        console.error(err);
        setError("Could not connect to wallet");
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>Liquidity Pool dApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </header>
  );
}

export default Header;
