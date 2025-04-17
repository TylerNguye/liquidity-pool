// src/components/ExchangePanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ExchangeABI from '../contracts/Exchange.sol';

const EXCHANGE_ADDRESS = '0xa0b53DBE8459b14B0468Cf43BC89Fb783c11bAc4'; // Replace with actual deployed address

function ExchangePanel({ provider, signer }) {
  const [inputValue, setInputValue] = useState('');
  const [exchangeValue, setExchangeValue] = useState(null);

  const fetchValue = async () => {
    if (!provider) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI, provider);
      const value = await contract.getValue();
      setExchangeValue(value.toString());
    } catch (error) {
      console.error("Error fetching exchange value:", error);
    }
  };

  const handleIncrement = async () => {
    if (!signer) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI, signer);
      const tx = await contract.increment(inputValue);
      await tx.wait();
      alert("Increment successful");
      fetchValue();
    } catch (error) {
      console.error("Exchange increment error:", error);
      alert("Increment failed");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Exchange Contract</h2>
      <div>
        <label>
          Increment Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <button onClick={handleIncrement} style={{ marginLeft: "1rem" }}>
          Increment
        </button>
      </div>
      <button onClick={fetchValue} style={{ marginTop: "1rem" }}>
        Get Current Value
      </button>
      {exchangeValue !== null && (
        <p>Current Value: {exchangeValue}</p>
      )}
    </div>
  );
}

export default ExchangePanel;
