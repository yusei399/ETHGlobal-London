import { ethers } from "ethers";
import { connectProvider } from "./connect";
import dotenv from 'dotenv';

dotenv.config();

export function createSignerFromPrivateKey(provider: ethers.JsonRpcProvider, privateKey: string): ethers.Wallet {
    const wallet = new ethers.Wallet(privateKey, provider);
    return wallet;
}

export function createSignersFromMnemonic(provider: ethers.JsonRpcProvider): ethers.HDNodeWallet[] {
	var signers = [];
	let mnemonic = ethers.Wallet.createRandom().mnemonic?.phrase;
	if (!mnemonic) {
		throw new Error("Failed to create mnemonic");
	}
	let parent = ethers.HDNodeWallet.fromPhrase(mnemonic, "wasabi", "m/44'/60'/0'/0");
	for (let i = 0; i < 4; i++) {
		let wallet = parent.deriveChild(i);
		let signer = wallet.connect(provider);
		signers.push(signer);
	}
    return signers;
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
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

}

main().catch(console.error);
