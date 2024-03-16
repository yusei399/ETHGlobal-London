// import SampleRecipientJson from "../artifacts/contracts/SampleRecipient.sol/SampleRecipient.json" assert {type: "json"};
// import SampleForwarderJson from "../artifacts/contracts/SampleForwarder.sol/SampleForwarder.json" assert {type: "json"};

import { ethers } from "ethers";

async function init() {
    console.log("init", ethers.version);
}

init().catch(console.error);
