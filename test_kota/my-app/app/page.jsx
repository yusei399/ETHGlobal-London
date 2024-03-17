"use client"

import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import React, { useState } from "react";

export default function Home() {
  const [rate, setRate] = useState(""); // レートを表示するための状態

  const fetchWldEthRate = async () => {
    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractAddress = "0x45EDA54fAE7F616231B3976aA1ac6BCB181871bb"; // コントラクトアドレスを更新
      const contractABI = [
        {
          "inputs": [],
          "name": "wldEthRate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "updateWldEthRate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // wldEthRate関数を呼び出し
      const rate = await contract.wldEthRate();
      setRate(rate.toString()); // 状態を更新してレートを表示
      alert(`Current WLD to ETH rate: ${rate.toString()}`);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch WLD to ETH rate: " + error.message);
    }
  };

  const updateRate = async () => {
    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractAddress = "0x45EDA54fAE7F616231B3976aA1ac6BCB181871bb"; // コントラクトアドレスを更新
      const contractABI = [
        {
          "inputs": [],
          "name": "updateWldEthRate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // updateWldEthRate関数を呼び出し
      await contract.updateWldEthRate();
      alert("WLD to ETH rate has been updated.");
    } catch (error) {
      console.error(error);
      alert("Failed to update WLD to ETH rate: " + error.message);
    }
  };

  return (
    <div className="w-screen h-screen justify-center items-center flex flex-col gap-4">
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={fetchWldEthRate}
      >
        Fetch WLD to ETH Rate
      </button>
      <button
        className="p-2 bg-green-500 text-white rounded"
        onClick={updateRate}
      >
        Update WLD to ETH Rate
      </button>
      {rate && <p>Current Rate: {rate}</p>} {/* レートを表示 */}
    </div>
  );
}
