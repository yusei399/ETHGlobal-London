"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accounts: string[]) => {
            setUserAddress(accounts[0]);
          });
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }, []);

  return (
    <main>
      {userAddress ? (
        <p>Connected with: {userAddress}</p>
      ) : (
        <p>Not connected to MetaMask</p>
      )}
    </main>
  );
}
//バーセルテスト