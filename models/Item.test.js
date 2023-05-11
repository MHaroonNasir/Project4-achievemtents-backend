require("dotenv").config();
const Item = require("../models/Item.js");
const db = require("../database/connect.js");
const { Pool } = require("pg");

describe("Item Model", () => {
  let testDB;

  beforeAll(async () => {
    testDB = new Pool({
      connectionString: process.env.DB_URL,
      max: 1,
      idleTimeoutMillis: 0,
    });

    db.query = (text, values) => {
      return testDB.query(text, values);
    };
  });

  beforeEach(async () => {
    await testDB.query(
      "CREATE TEMPORARY TABLE items (LIKE items INCLUDING ALL)"
    );
    await testDB.query(
      "INSERT INTO pg_temp.items (item_name, price, item_icon, quantity) VALUES ('Steam £5 Wallet Code', 5000, 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg', 10), ('Steam £10 Wallet Code', 10000, 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg', 10), ('Steam £15 Wallet Code', 25000, 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg', 10), ('Steam £25 Wallet Code', 32000, 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg', 10);"
    );
  });

  afterEach(async () => {
    await testDB.query("DROP TABLE IF EXISTS pg_temp.items");
  });

  describe("getAllItems function", () => {
    it("should exist", async () => {
      expect(Item.getAllItems()).toBeDefined();
    });

    it("should throw an error if no items exist", async () => {
      await testDB.query("DELETE FROM pg_temp.items;");

      expect(async () => {
        await Item.getAllItems();
      }).toThrow("There are currently no items in the store!");
    });

    it("should return an array of all the items if they exist", async () => {
      const items = await Item.getAllItems();

      expect(items.length).toEqual(4);
    });
  });

  describe("getItemById function", () => {
    it("should exist", async () => {
      expect(Item.getItemById(1)).toBeDefined();
    });

    it("should throw an error if no item with the specified id is found", async () => {
      expect(async () => {
        await Item.getItemById(10);
      }).toThrow("No item with that item id found!");
    });

    it("should return the item of the specified id", async () => {
      const expectedResult = new Item({
        item_id: 1,
        item_name: "Steam £5 Wallet Code",
        price: 5000,
        item_icon:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg",
        quantity: 10,
      });

      const result = await Item.getItemById(1);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("buyItem function", () => {
    it("should exist", async () => {
      const item = await Item.getItemById(1);

      expect(await item.buyItem(item.quantity - 1)).toBeDefined();
    });

    it("should decrease the item quantity by 1 when called", async () => {
      const item = await Item.getItemById(1);
      await item.buyItem(item.quantity - 1);

      const boughtItem = await Item.getItemById(1);

      expect(boughtItem.quantity).toBe(9);
    });
  });
});
