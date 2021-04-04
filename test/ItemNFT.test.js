const { accounts, contract } = require("@openzeppelin/test-environment");

const { expect } = require('chai');

const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const ItemNFT = contract.fromArtifact("ItemNFT"); // Loads a compiled contract

describe("ItemNFT", function () {
  const [sender, receiver] = accounts;

  beforeEach(async function () {
    // The bundled BN library is the same one web3 uses under the hood
    this.value = new BN(1);

    this.itemNFT = await ItemNFT.new();
    this.itemNFT.mintItem(sender,0);
    this.itemNFT.mintItem(sender,0);
    this.itemNFT.mintItem(receiver,0);
    this.itemNFT.mintItem(sender,0);
    this.itemNFT.mintItem(sender,0);
    this.itemNFT.mintItem(receiver,0);
    this.itemNFT.mintItem(receiver,0);
    this.itemNFT.mintItem(receiver,0);
    this.itemNFT.mintItem(sender,0);
    this.itemNFT.mintItem(sender,0);
  });

  it('returns correct name', async function () {
    expect(await this.itemNFT.name()).to.equal('TradeIcons');
  });
  it('returns correct symbol', async function () {
    expect(await this.itemNFT.symbol()).to.equal('ICON');
  });
  it('returns correct uri for token 1', async function () {
    expect(await this.itemNFT.tokenURI(1)).to.equal('http://nft.semift.com/0/1');
  });
  it('returns correct ownerTokens for account 1', async function () {
    expect(await this.itemNFT.ownerTokens(sender)).to.equal('1;2;4;5;9;10;');
  });
  it('returns correct ownerTokens for account 2', async function () {
    expect(await this.itemNFT.ownerTokens(receiver)).to.equal('3;6;7;8;');
  });
  it('returns correct balanceOf for account 1', async function () {
    expect((await this.itemNFT.balanceOf(sender)).toNumber()).to.equal(6);
  });
  it('returns correct balanceOf for account 2', async function () {
    expect((await this.itemNFT.balanceOf(receiver)).toNumber()).to.equal(4);
  });
//   it('mint negative type fails', async function () {
//     // Conditions that trigger a require statement can be precisely tested
//     await expectException(
//       this.itemNFT.mintItem(sender,-1),
//       'Mint NFT with negative item type',
//     );
//   });
});
