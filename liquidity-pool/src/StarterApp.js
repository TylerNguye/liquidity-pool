import './App.css';
import { useState} from 'react';
import { connectWallet, getCurrentValue, incrementValue } from './contractUtils';


function App() {
 const [curValue, setCurValue] = useState(0);  // On-chain value
 const [inputValue, setInputValue] = useState('');  // Increment value
 const [contract, setContract] = useState(null);  // Store contract instance
 const [isConnected, setIsConnected] = useState(false);  // Track wallet connection


 // Connect Wallet & Initialize Contract
 const handleConnectWallet = async () => {
   const contractInstance = await connectWallet();
   if (contractInstance) {
     setContract(contractInstance);
     const value = await getCurrentValue(contractInstance);
     setCurValue(value);
     setIsConnected(true);
   }
 };


 // Increment function
 const handleIncrement = async (e) => {
   e.preventDefault();


   if (!contract) {
     alert("Please connect your wallet first!");
     return;
   }


   const incrementAmount = parseInt(inputValue);


   if (!isNaN(incrementAmount)) {
     const success = await incrementValue(contract, incrementAmount);
     if (success) {
       const updatedValue = await getCurrentValue(contract);
       setCurValue(updatedValue);
       setInputValue('');
       alert(`Successfully incremented by ${incrementAmount}!`);
     } else {
       alert("Transaction failed. Please try again.");
     }
   } else {
     alert("Please enter a valid number.");
   }
 };


 return (
   <div>
     <h1>Counter</h1>
     <h3>A simple Web 3 Application that increments a value.</h3>


     {!isConnected ? (
       <button onClick={handleConnectWallet}>Connect Wallet!</button>
     ) : (
       <p>✅ Wallet Connected</p>
     )}


     <h4>Current Value: {curValue}</h4>


     <form>
       <input
         placeholder="Enter Increment Value"
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
       />
       <br />
       <button type='submit' onClick={handleIncrement}>Increment!</button>
     </form>
   </div>
 );
}


export default App;