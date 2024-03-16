import { ethers } from "ethers";
import dotenv from 'dotenv';

import { createSignersFromMnemonic, createSignerFromPrivateKey } from "./signer";
import { updateCoin, updateToken } from "./balance";
import { init }	from "./init";

dotenv.config();

import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json";
import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json";

const forwarderAddress: string = "0x5790eB7Ec13F5F28Fa9026c89b080CdEf32C62dD";
const recipientAddress: string = "0xD31A8B94d4E39a695F2C620d2Acd3792FB96bEBD";

export async function mintToken(provider: ethers.JsonRpcProvider, wallets: any, mintAmount: number) {
	if (recipientAddress) {
		if (wallets.length > 0) {
			try {
				// await updateCoin(provider, wallets);
				// await updateToken(provider, wallets);
				let contract = new ethers.Contract(recipientAddress, SampleRecipientJson.abi, wallets[0]);
				for (let i = 0; i < wallets.length; i++) {
					let wallet = wallets[i];
					let tx = await contract.mint(wallet.address, mintAmount);
					await tx.wait(1);
					console.log("mintToken", wallet.address, mintAmount);
				}
				// await updateCoin(provider, wallets);
				// await updateToken(provider, wallets);
			} catch (err) {
				console.log("mintToken err", err);
			}
		}
	}
}

// async function transferToken(provider: ethers.JsonRpcProvider, toAddress: string, amount: number) {

// }

async function main() {
	// const providerUrl: string = process.env.SEPOILA_PROVIDER_URL || "";
	// if (!providerUrl) {
	// 	throw new Error("SEPOILA_PROVIDER_URL is not set");
	// }
	// const provider: ethers.JsonRpcProvider | null = new ethers.JsonRpcProvider(providerUrl);
	// if (!provider) {
	// 	throw new Error("Failed to connect provider");
	// }
	// const privateKey: string = process.env.RELAYER_PRIVATE_KEY || "";
	// if (!privateKey) {
	// 	throw new Error("RELAYER_PRIVATE_KEY is not set");
	// }

	// const relayerSigner: ethers.Wallet = createSignerFromPrivateKey(provider, privateKey);
	// const wallets = createSignersFromMnemonic(provider);

	const [provider, wallets, relayerSigner] = await init();
	await mintToken(provider, [relayerSigner], 100);
}

// main().catch(console.error);