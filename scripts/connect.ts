import { ethers } from "ethers";
import dotenv from 'dotenv';
import { Network, Alchemy } from 'alchemy-sdk';

dotenv.config();

export async function connectProvider(providerUrl: string): Promise<ethers.JsonRpcProvider | null> {
    let provider: ethers.JsonRpcProvider | null = null;

    try {
        provider = new ethers.JsonRpcProvider(providerUrl);
        const blockNumber = await provider.getBlockNumber();
        console.log("getBlockNumber", blockNumber);
		return provider;
    } catch (err) {
        console.error("connectProvider err", err);
        throw err;
		return null;
    }
}

const providerUrl: string | undefined = process.env.SEPOILA_PROVIDER_URL;
if (!providerUrl) {
	throw new Error("SEPOILA_PROVIDER_URL is not set");
}

// console.log("providerUrl", providerUrl);
console.log("chain id", Network.ETH_SEPOLIA);

connectProvider(providerUrl)
	.then((provider) => {
		if (provider) {
			console.log("Provider connected");
		} else {
			console.log("Failed to connect provider");
		}
	})
	.catch(console.error);
