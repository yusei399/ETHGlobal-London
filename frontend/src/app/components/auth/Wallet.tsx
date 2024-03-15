"use client";
import React, { useState } from 'react';
import { Button } from '@mui/material';

const ConnectWallet = () => {
  const [userAddress, setUserAddress] = useState('');

  const connectWallet = async () => {
	console.log("connectWallet");
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  };

  return (
    <div>
      <Button onClick={connectWallet}>MetaMaskに接続</Button>
      {userAddress && <p>Connected Address: {userAddress}</p>}
    </div>
  );
};

export default ConnectWallet;
