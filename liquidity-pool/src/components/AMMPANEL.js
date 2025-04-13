// src/components/AMMPanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import AutomatedMarketMakerABI from '../contracts/AutomatedMarketMaker.sol';

const AMM_ADDRESS = '0xYourAutomatedMarketMakerAddress'; // Replace with actual deployed address

function AMMPanel({ provider, signer }) {
  const [inputValue, setInputValue] = useState('');
  const [contractValue, setContractValue] = useState(null);

  const fetchValue = async () => {
    if (!provider) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(AMM_ADDRESS, AutomatedMarketMakerABI, provider);
      const value = await contract.getValue();
      setContractValue(value.toString());
    } catch (error) {
      console.error("Error fetching value:", error);
    }
  };

  const handleIncrement = async () => {
    if (!signer) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(AMM_ADDRESS, AutomatedMarketMakerABI, signer);
      const tx = await contract.increment(inputValue);
      await tx.wait();
      alert("Increment successful");
      fetchValue();
    } catch (error) {
      console.error("Increment error:", error);
      alert("Increment failed");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>AutomatedMoneyMaker Contract</h2>
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
      {contractValue !== null && (
        <p>Current Value: {contractValue}</p>
      )}
    </div>
  );
}

export default AMMPanel;
