// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import AMMPanel from './components/AMMPANEL';
import ExchangePanel from './components/ExchangePanel';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');

  return (
    <div style={{ padding: "2rem" }}>
      <Header setProvider={setProvider} setSigner={setSigner} setAccount={setAccount} />
      {account && <p>Connected Account: {account}</p>}
      <AMMPanel provider={provider} signer={signer} />
      <ExchangePanel provider={provider} signer={signer} />
    </div>
  );
}

export default App;
