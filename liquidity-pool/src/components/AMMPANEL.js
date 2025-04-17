// src/components/AMMPanel.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import AutomatedMarketMakerABI from '../artifacts/contracts/AutomatedMarketMaker.sol/AutomatedMarketMaker.json';
import LiquidABI from '../artifacts/contracts/LiquidToken.sol/LiquidToken.json'

const AMM_ADDRESS = '0xF8a6ea7538F866c809401505E57aB490c1609ba0'; // Replace with actual deployed address
const LIQUID_ADDRESS = '0x3bD174362153355b48821b304Ed7Dfe294F0f822'

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
      //const value = await contract.mint(signer.getAddress(), 5);
      //const value = signer.getAddress();
      setContractValue(await contract.balanceOf(signer.getAddress()));
      //setContractValue(value);
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
      const contract = new ethers.Contract(AMM_ADDRESS, AutomatedMarketMakerABI.abi, signer);
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
        Get Current Value
      </button>
      {contractValue !== null && (
        <p>Current Value: {contractValue}</p>
      )}
    </div>
  );
}

export default AMMPanel;
