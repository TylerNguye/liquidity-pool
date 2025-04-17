// src/components/AMMPanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import AutomatedMarketMakerABI from '../artifacts/contracts/AutomatedMarketMaker.sol/AutomatedMarketMaker.json';
import LiquidABI from '../artifacts/contracts/LiquidToken.sol/LiquidToken.json'

const AMM_ADDRESS = '0xDDd69BA053a82D49F20F28ab99E21Da712220dAd'; // Replace with actual deployed address
const LIQUID_ADDRESS = '0x83e3C8C1f1cE403C7ec8736065F0e1695cA3e8d0'

function AMMPanel({ provider, signer }) {
  const [inputValue, setInputValue] = useState('');
  const [contractValue, setContractValue] = useState(null);

  const fetchValue = async () => {
    if (!signer) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const contract = new ethers.Contract(LIQUID_ADDRESS, LiquidABI.abi, signer);
      const value = await contract.balanceOf(signer.getAddress())
      setContractValue(value);
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
      if (isNaN(+inputValue)) {
        alert("Input needs to be a valid number!")
        return
      }
      if (+inputValue <= 0) {
        alert("Input needs to be a positive integer!")
        return
      }
      const contract = new ethers.Contract(LIQUID_ADDRESS, LiquidABI.abi, signer);
      const tx = await contract.mint(signer.getAddress(), ethers.toBigInt(inputValue), {gasLimit: 5000000});
      alert("Increment successful");
      fetchValue();
    } catch (error) {
      console.error("Increment error:", error);
      alert("Increment failed");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>LiquidToken Faucet</h2>
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
        Get Liquid Token Balance
      </button>
      {contractValue !== null && (
        <p>Current Liquid Token Amount: {contractValue}</p>
      )}
    </div>
  );
}

export default AMMPanel;
