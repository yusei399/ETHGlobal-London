import { ethers } from "ethers";
import dotenv from 'dotenv';

import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json";
import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json";

import { connectProvider } from "./connect";
import { createSignerFromPrivateKey } from "./signer";

dotenv.config();

export async function deploy(signer: ethers.Signer): Promise<string[]>{
	console.log("deploying");
    let sampleForwarderFactory = new ethers.ContractFactory(SampleForwarderJson.abi, SampleForwarderJson.bytecode, signer);
    let sampleForwarderContract = await sampleForwarderFactory.deploy("SampleForwarder");
    await sampleForwarderContract.waitForDeployment();
    let sampleRecipientFactory = new ethers.ContractFactory(SampleRecipientJson.abi, SampleRecipientJson.bytecode, signer);
    let sampleRecipientContract = await sampleRecipientFactory.deploy("SampleRecipient", "SRC", sampleForwarderContract.target);
    await sampleRecipientContract.waitForDeployment();
	console.log("SampleForwarder deployed to:", sampleForwarderContract.target);
	console.log("SampleRecipient deployed to:", sampleRecipientContract.target);
    return [sampleForwarderContract.target as string, sampleRecipientContract.target as string];
}

async function main() {
	const providerUrl: string = process.env.SEPOILA_PROVIDER_URL || "";
    if (!providerUrl) {
        throw new Error("SEPOILA_PROVIDER_URL is not set");
    }

    try {
        const provider: ethers.JsonRpcProvider | null = await connectProvider(providerUrl);
		if (!provider) {
			throw new Error("Failed to connect provider");
		}
        const privateKey: string = process.env.RELAYER_PRIVATE_KEY || "";
        if (!privateKey) {
            throw new Error("RELAYER_PRIVATE_KEY is not set");
        }

        const relayerSigner: ethers.Wallet = createSignerFromPrivateKey(provider, privateKey);
        console.log("Relayer signer address:", relayerSigner.address);
		await deploy(relayerSigner);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// main().catch(console.error);