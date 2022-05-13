const {expect} = require('chai');
const {ethers} = require('hardhat');
import { Signer, Contract } from "ethers";

describe("Token contract", function () {

  let Token;
  let newToken : Contract;
  let owner : Signer;
  let addr1 : Signer;
  let addr2 : Signer;
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
      Token = await ethers.getContractFactory("ERC20");
      [owner, addr1, addr2] = await ethers.getSigners();
      newToken = await Token.deploy(40);
    });

    describe("Deployment", function () {
      it("Should get correct totalSupply", async function () {
        expect(await newToken.totalSupply()).to.equal(40);
      });


      it("Should should successfully deploy", async function () {
        console.log("success!");
      });


      it("Should let you send tokens to another address", async function() {
        await newToken.transfer(addr1.getAddress(), ethers.utils.parseEther("100"));
        expect(await newToken.balanceOf(addr1.getAddress())).to.equal(ethers.utils.parseEther("100"));
      });


      it("Should check what you can cut token", async function () {
        expect(await newToken.decimals()).to.equal(0);
      })
    });
})
