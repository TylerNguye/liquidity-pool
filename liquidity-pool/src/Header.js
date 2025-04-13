// src/components/Header.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

function Header({ setProvider, setSigner, setAccount }) {
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        setAccount(account);
      } catch (err) {
        setError('Could not connect to wallet');
        console.error(err);
      }
    } else {
      setError('Please install MetaMask!');
    }
  };

  return (
    <header>
      <h1>Liquidity Pool</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
  );
}

export default Header;
