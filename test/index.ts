const {expect} = require('chai');
const {ethers} = require('hardhat');
import { Signer, Contract } from "ethers";

describe("Token contract", function () {

  let Token;
  let newToken : Contract;
  let owner : Signer;
  let addr1 : Signer;
  let addr2 : Signer;
  const ZERO_ADDRESS = ethers.constants.AddressZero;

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

      it("SHOULD BE REVERTED | try mint to zero address", async function() {
        await expect(newToken.connect(owner).mint(ZERO_ADDRESS, 200))
          .to.be.revertedWith("Cant mint to zero address")
      })
  
      it("SHOULD BE REVERTED | try burn from zero address", async function() {
        await expect(newToken.connect(owner).burn(ZERO_ADDRESS, 200))
          .to.be.revertedWith("Cant burn from zero address")
      })

      it("SHOULD BE REVERTED | try burn out of balance", async function() {
        await expect(newToken.connect(owner).burn(addr1.getAddress(), 200))
          .to.be.revertedWith("Amount out of balance")
      })  
  
      it("SHOULD BE REVERTED | not owner try mint or burn", async function() {
        await expect(newToken.connect(addr1).burn(owner.getAddress(), 200))
          .to.be.revertedWith("You are not an owner")
  
        await expect(newToken.connect(addr1).mint(owner.getAddress(), 200))
          .to.be.revertedWith("You are not an owner")
      })
  
      it("SHOULD BE SUCCESS  | mint and burn change balance", async function() {
        await newToken.connect(owner).mint(owner.getAddress(), 200)
        let balance = await newToken.connect(owner).balanceOf(owner.getAddress())
        expect(balance).to.be.eq(200)
  
        await newToken.connect(owner).burn(owner.getAddress(), 100)
        balance = await newToken.connect(owner).balanceOf(owner.getAddress())
        expect(balance).to.be.eq(100)
      })

     
    });
})
