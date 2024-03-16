// import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json" assert {type: "json"};
// import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json" assert {type: "json"};

import { ethers } from "ethers";
import dotenv from 'dotenv';

import { createSignersFromMnemonic, createSignerFromPrivateKey } from "./signer";
import { updateCoin, updateToken } from "./balance";

dotenv.config();

export const providerUrl: string = process.env.SEPOILA_PROVIDER_URL || "";
if (!providerUrl) {
	throw new Error("SEPOILA_PROVIDER_URL is not set");
}

export const privateKey: string = process.env.RELAYER_PRIVATE_KEY || "";
if (!privateKey) {
	throw new Error("RELAYER_PRIVATE_KEY is not set");
}

export async function init(): Promise<[ethers.JsonRpcProvider, ethers.HDNodeWallet[], ethers.Wallet]> {
    // console.log("init", ethers.version);

	const provider: ethers.JsonRpcProvider | null = new ethers.JsonRpcProvider(providerUrl);
	if (!provider) {
		throw new Error("Failed to connect provider");
	}

	const wallets = createSignersFromMnemonic(provider);

	// await updateCoin(provider, wallets);
	// await updateToken(provider, wallets);

	const relayerSigner: ethers.Wallet = createSignerFromPrivateKey(provider, privateKey);
	// await updateCoin(provider, [relayerSigner]);
	// await updateToken(provider, [relayerSigner]);

	return [provider, wallets, relayerSigner];
}

init().catch(console.error);
