// src/components/AMMPanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import AutomatedMoneyMakerABI from '../contracts/AutomatedMoneyMaker.json';

// Replace with deployed AutomatedMoneyMaker contract address
const AUTOMATED_MAKER_ADDRESS = '0xYourAutomatedMoneyMakerAddress';

function AMMPanel({ provider }) {
  const [token1Balance, setToken1Balance] = useState('');
  const [token1Change, setToken1Change] = useState('');
  const [k, setK] = useState('');
  const [output, setOutput] = useState(null);

  const handleCalculate = async () => {
    if (!provider) {
      alert('Connect your wallet first.');
      return;
    }

    try {
      const contract = new ethers.Contract(
        AUTOMATED_MAKER_ADDRESS,
        AutomatedMoneyMakerABI,
        provider
      );

      const result = await contract.updatePoolBalance(
        token1Balance,
        token1Change,
        k
      );
      setOutput(result.toString());
    } catch (err) {
      console.error('AMM Calculation error: ', err);
      alert('Error calculating output.');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Automated Market Maker</h2>
      <div>
        <label>
          Token 1 Balance:
          <input
            type="number"
            value={token1Balance}
            onChange={(e) => setToken1Balance(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Token 1 Change:
          <input
            type="number"
            value={token1Change}
            onChange={(e) => setToken1Change(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          AMM Constant (k):
          <input
            type="number"
            value={k}
            onChange={(e) => setK(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate Output Amount</button>
      {output !== null && <p>Output Token Amount: {output}</p>}
    </div>
  );
}

export default AMMPanel;
