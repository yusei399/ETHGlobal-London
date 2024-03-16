import { ethers } from "ethers";
import dotenv from 'dotenv';

import { createSignersFromMnemonic, createSignerFromPrivateKey } from "./signer";

dotenv.config();

import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json";
import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json";

const forwarderAddress: string = "0x5790eB7Ec13F5F28Fa9026c89b080CdEf32C62dD";
const recipientAddress: string = "0xD31A8B94d4E39a695F2C620d2Acd3792FB96bEBD";

const providerUrl: string = process.env.SEPOILA_PROVIDER_URL || "";
if (!providerUrl) {
	throw new Error("SEPOILA_PROVIDER_URL is not set");
}

const privateKey: string = process.env.RELAYER_PRIVATE_KEY || "";
if (!privateKey) {
	throw new Error("RELAYER_PRIVATE_KEY is not set");
}

async function updateCoin(provider: ethers.JsonRpcProvider, wallets: any) {
    if (provider) {
        try {
            for (let i = 0; i < wallets.length; i++) {
                let wallet = wallets[i];
                let balance = await provider.getBalance(wallet.address);
                // wallet.balanceOld = wallet.balance;
                // wallet.balance = balance;
				console.log("i", i, "address", wallet.address, "balance", balance.toString());
            }
        } catch (err) {
            console.error("updateCoin error", err);
        }
    }
}

async function updateToken(provider: ethers.JsonRpcProvider, wallets: any) {
    if (provider && recipientAddress) {
        try {
            let contract = new ethers.Contract(recipientAddress, SampleRecipientJson.abi, provider);
            for (let i = 0; i < wallets.length; i++) {
                let wallet = wallets[i];
                let token = await contract.balanceOf(wallet.address);
                // wallet.tokenOld = wallet.token;
                // wallet.token = token;
				console.log("i", i, "address", wallet.address, "token", token.toString());
            }
        } catch (err) {
            console.error("updateToken error", err);
        }
    }
}

async function main() {
	const provider: ethers.JsonRpcProvider | null = new ethers.JsonRpcProvider(providerUrl);
	if (!provider) {
		throw new Error("Failed to connect provider");
	}

	const wallets = createSignersFromMnemonic(provider);

	await updateCoin(provider, wallets);
	await updateToken(provider, wallets);

	const relayerSigner: ethers.Wallet = createSignerFromPrivateKey(provider, privateKey);
	await updateCoin(provider, [relayerSigner]);
	await updateToken(provider, [relayerSigner]);
}

main().catch(console.error);