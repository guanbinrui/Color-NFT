const { assert } = require("chai");

const Color = artifacts.require("./Color.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Color", (accounts) => {
  let contract;

  describe("create", async () => {
    contract = await Color.deployed();
  });

  describe("depolyment", async () => {
    it("depolys successfully", async () => {
      assert.notEqual(contract.address, 0x0);
      assert.notEqual(contract.address, "");
      assert.notEqual(contract.address, null);
      assert.notEqual(contract.address, undefined);
    });

    it("has a name", async () => {
      assert.equal(await contract.name(), "Color");
    });

    it("has a symbol", async () => {
      assert.equal(await contract.symbol(), "COR");
    });
  });

  describe("minting", async () => {
    it("mint a new token", async () => {
      const receipt = await contract.mint("#000000");
      assert.equal(await contract.totalSupply(), 1);

      const event = receipt.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, "id");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0]);
    });

    it("cannot mint same token", async () => {
      await contract.mint("#FFFFFF");
      await contract.mint("#FFFFFF").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("list", async () => {
      await contract.mint("#FF0000");

      const colors = [];
      const total = await contract.totalSupply();

      for (let i = 0; i < total; i += 1) {
        colors.push(await contract.colors(i));
      }

      assert.equal(
        colors.join(","),
        ["#000000", "#FFFFFF", "#FF0000"].join(",")
      );
    });
  });
});
