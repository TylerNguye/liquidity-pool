// src/components/ExchangePanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ExchangeABI from '../contracts/Exchange.sol';

const EXCHANGE_ADDRESS = '0xbC8B59E4Cc403bFA41be3D3192aAaCBA9F1d474e'; // Replace with actual deployed address

function ExchangePanel({ provider, signer }) {
  const [inputValue, setInputValue] = useState('');
  const [exchangeValue, setExchangeValue] = useState(null);

  const fetchValue = async () => {
    if (!provider) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI.abi, signer);
      const eth = await contract.reserveA();
      const liqd = await contract.reserveB();
      setExchangeValue(eth.toString());
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
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI.abi, signer);
      const tx = await contract.addLiquidity(inputValue);
      await tx.wait();
      alert("Increment successful");
      fetchValue();
    } catch (error) {
      console.error("Exchange increment error:", error);
      alert("Increment failed");
    }
  };

  const initializePool = async () => {
    if (!signer) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(EXCHANGE_ADDRESS, ExchangeABI.abi, signer);
      await contract.setUp('0xfff9976782d46cc05630d1f6ebab18b2324d6b14', '0x83e3C8C1f1cE403C7ec8736065F0e1695cA3e8d0',
        '0xC8544298CEcD87E6F059c1A1058E85a94AF93acF')
    } catch (error) {
      console.error("Init pool failed: ", error);
      alert("failed");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Liquidity Pool</h2>
      <div>
        <label>
          ETH:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <button onClick={handleIncrement} style={{ marginLeft: "1rem" }}>
          Add Liquidity
        </button>
      </div>
      <button onClick={fetchValue} style={{ marginTop: "1rem" }}>
        Get Pool Balances
      </button>
      <button onClick={initializePool} style={{ marginTop: "1rem" }}>
        Initialize Pool
      </button>
      {exchangeValue !== null && (
        <>
          <p>Current Value: {exchangeValue}</p>
          <p>Current Value: {exchangeValue}</p>
        </>
      )}
    </div>
  );
}

export default ExchangePanel;
