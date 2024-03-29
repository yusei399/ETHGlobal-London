import { ethers } from "ethers";
import { updateCoin, updateToken } from "./balance";
import { init } from "./init";
import { mintToken } from "./mint";
import dotenv from 'dotenv';

dotenv.config();

import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json";
import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json";

const forwarderAddress: string = "0x5790eB7Ec13F5F28Fa9026c89b080CdEf32C62dD";
const recipientAddress: string = "0xD31A8B94d4E39a695F2C620d2Acd3792FB96bEBD";


async function signMetaTransferTransaction(signer: any, toAddress: string, amount: number) {
    let sampleForwarder = new ethers.Contract(forwarderAddress, SampleForwarderJson.abi, signer);
    let sampleRecipient = new ethers.Contract(recipientAddress, SampleRecipientJson.abi, signer);
    let eip712domain = await sampleForwarder.eip712Domain();
    let domain = {
        chainId: eip712domain.chainId,
        name: eip712domain.name,
        verifyingContract: eip712domain.verifyingContract,
        version: eip712domain.version,
    };
    let types = {
        ForwardRequest: [
            { type: "address", name: "from" },
            { type: "address", name: "to" },
            { type: "uint256", name: "value" },
            { type: "uint256", name: "gas" },
            { type: "uint256", name: "nonce" },
            { type: "uint48", name: "deadline" },
            { type: "bytes", name: "data" },
        ],
    };
    let iface = new ethers.Interface(SampleRecipientJson.abi);
    let data = iface.encodeFunctionData("transfer", [toAddress, amount]);
    let value = {
        from: signer.address,
        to: sampleRecipient.target,
        value: 0,
        gas: 50000,
        nonce: await sampleForwarder.nonces(signer.address),
        deadline: (Math.floor(Date.now() / 1000) + 3600),
        data: data,
    };
    let sign = await signer.signTypedData(domain, types, value);
    let request = {
        from: value.from,
        to: value.to,
        value: value.value,
        gas: value.gas,
        deadline: value.deadline,
        data: value.data,
        signature: sign,
    };
    return request;
}

async function sendMetaTransaction(signer: any, request: any) {
    let sampleForwarder = new ethers.Contract(forwarderAddress, SampleForwarderJson.abi, signer);
    let result = await sampleForwarder.verify(request);
    if (result) {
        let tx = await sampleForwarder.execute(request);
        await tx.wait(1);
    } else {
        throw new Error("Failed to verify");
    }
}

async function main() {
	const [provider, wallets, relayerSigner] = await init();
    // const toAddress = "0x6b07154C8e768673578e539854C70a8703D613b1";
    // const amount = 10;

	await updateCoin(provider, [relayerSigner]);
	console.log("mint to relayer");
	await mintToken(provider, [relayerSigner], 100);

    try {
        const user1 = wallets[0];
		console.log("user1", user1.address, "relayer", relayerSigner.address);
		console.log("relayer transfers 10 to user1");
        const request1 = await signMetaTransferTransaction(relayerSigner, user1.address, 10);
		console.log({ request1 });
        await sendMetaTransaction(relayerSigner, request1);
		console.log("sccess sending meta tx 1");
		await updateToken(provider, [user1]);
		await updateCoin(provider, [user1]);
		await updateToken(provider, [relayerSigner]);
		await updateCoin(provider, [relayerSigner]);

		const user2 = wallets[1];
		console.log("user1", user1.address, "user2", user2.address);
		console.log("user1 transfers 3 to user2");
		const request2 = await signMetaTransferTransaction(user1, user2.address, 3);
		console.log({ request2 });
		await sendMetaTransaction(relayerSigner, request2);
		console.log("sccess sending meta tx 2");
		await updateToken(provider, [user1]);
		await updateCoin(provider, [user1]);
		await updateToken(provider, [user2]);
		await updateCoin(provider, [user2]);
		await updateToken(provider, [relayerSigner]);
		await updateCoin(provider, [relayerSigner]);

	} catch (error) {
		console.error(error);
	}
}

main().catch(console.error);