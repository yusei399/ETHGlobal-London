"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Web3 from 'web3';

const tokenAddress = '0x115131115D536dF6C4685d38dC911250704EFE8c';
const tokenABI = [
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
];

const ConnectWallet = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [ethBalance, setEthBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } catch (error) {
        alert('Web3の初期化中にエラーが発生しました。');
      }
    } else {
      alert('MetaMaskがインストールされていません。');
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccounts(accounts);
        fetchEthBalance(accounts[0]);
        fetchTokenBalance(accounts[0]);
      } catch (error) {
        alert('ウォレットの接続に失敗しました。');
      }
    }
  };

  const fetchEthBalance = async (address:any) => {
    if (web3) {
      try {
        const balanceInWei = await web3.eth.getBalance(address);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setEthBalance(balanceInEth);
      } catch (error) {
        console.error('ETH残高の取得に失敗しました。', error);
      }
    }
  };

  const fetchTokenBalance = async (address : any) => {
    if (web3) {
      try {
        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await tokenContract.methods.balanceOf(address).call();
        const balanceInTokens = web3.utils.fromWei(String(balance), 'ether');

        setTokenBalance(balanceInTokens);
      } catch (error) {
        console.error('トークン残高の取得に失敗しました。', error);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={connectWallet}>MetaMaskに接続</Button>
      {accounts.length > 0 && (
        <div>
          <p>接続済みアドレス: {accounts[0]}</p>
          <p>ETH残高: {ethBalance} ETH</p>
          <p>トークン残高: {tokenBalance}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
