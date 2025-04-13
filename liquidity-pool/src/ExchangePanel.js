// src/components/ExchangePanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ExchangeABI from '../contracts/Exchange.json';

// Replace with your deployed Exchange contract address
const EXCHANGE_ADDRESS = '0xYourExchangeContractAddress';

function ExchangePanel({ provider, signer }) {
  const [value, setValue] = useState(null);
  const [incrementAmount, setIncrementAmount] = useState('');

  const loadValue = async () => {
    if (!provider) {
      alert('Connect your wallet first.');
      return;
    }

    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI, provider);
      const currentVal = await contract.getValue();
      setValue(currentVal.toString());
    } catch (err) {
      console.error('Error loading value:', err);
    }
  };

  const handleIncrement = async () => {
    if (!signer) {
      alert('Connect your wallet first.');
      return;
    }

    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI, signer);
      const tx = await contract.increment(incrementAmount);
      await tx.wait();
      alert('Increment successful!');
      loadValue();
    } catch (err) {
      console.error('Error on increment:', err);
      alert('Increment failed!');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Exchange Interaction</h2>
      <div>
        <button onClick={loadValue}>Load Current Value</button>
        {value !== null && <p>Current Value: {value}</p>}
      </div>
      <div>
        <label>
          Increment Amount:
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
        </label>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      {/* Later, add buttons/forms for addLiquidity/removeLiquidity if implemented */}
    </div>
  );
}

export default ExchangePanel;
