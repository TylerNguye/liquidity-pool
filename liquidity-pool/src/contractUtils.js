
import { ethers } from 'ethers';
import LiquidABI from './artifacts/contracts/LiquidToken.sol/LiquidToken.json'


const contractABI = LiquidABI.abi;
const contractAddress = '0x44Accdf07FE81c5c0B2bb5Ab3FEe8f711338B475';


// Utility function: Connect metamask wallet to website
export const connectWallet = async () => {
 if (!window.ethereum) {
     alert("MetaMask is required to use this app.");
     return null;
 }


 const provider = new ethers.BrowserProvider(window.ethereum);
 await provider.send("eth_requestAccounts", []).catch((error) => {
     console.error("MetaMask connection error:", error);
 });


 const signer = await provider.getSigner();
 return new ethers.Contract(contractAddress, contractABI, signer);
};


// Utility function: Get contract instance
export const getContract = async () => {
   if (!window.ethereum) {
       alert("MetaMask is required to use this app.");
       return null;
   }


   try {
       const provider = new ethers.BrowserProvider(window.ethereum);
       await provider.send("eth_requestAccounts", []).catch((error) => {
           console.error("MetaMask connection error:", error);
       });


       const signer = await provider.getSigner();
       return new ethers.Contract(contractAddress, contractABI, signer);
   } catch (error) {
       console.error("Error connecting to contract:", error);
       return null;
   }
};


// Utility function: Increment the on-chain value
export const incrementValue = async (contract, value) => {
 try {
   if (!contract) return false;


   if (typeof value !== 'number' && typeof value !== 'string') {
     console.error("Invalid value type:", typeof value);
     alert("Please enter a valid number.");
     return false;
   }
   const incrementAmount = ethers.toBigInt(value);
  
   const tx = await contract.increment(incrementAmount);
   await tx.wait();
   return true;
 } catch (error) {
   console.error('Error incrementing value:', error);
   alert("Transaction failed. See console for details.");
   return false;
 }
};


// Utility function: Retrieve the current value
export const getCurrentValue = async (contract) => {
   if (!contract) return 0;


   try {
       const value = await contract.getValue();
       return parseInt(value.toString());
   } catch (error) {
       console.error('Error fetching value:', error);
       return 0;
   }
};
