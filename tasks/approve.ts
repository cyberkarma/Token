const { task } = require('hardhat/config');
import * as dotenv from "dotenv";
import { HardhatArguments, HardhatParamDefinitions, HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const CONTRACTADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

task("approveTask", "Approve to this address tokens and push to allowances")
.addParam("to", "The account's address")
.addParam("ammount", "Ammount of tokens")
.setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL); 
    // const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider);
    const myContract = await hre.ethers.getContractAt('ERC20', CONTRACTADDRESS)
    const out = await myContract.approve(taskArgs.to, taskArgs.ammount);
    console.log(out)
});

module.exports = {};
