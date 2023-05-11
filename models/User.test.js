require("dotenv").config();
const User = require("./User.js");
const db = require("../database/connect.js");
const { Pool } = require("pg");

describe("User Model", () => {
  let testDB;
  const user = {
    username: "testuser",
    steam_id: "7349287394283749",
    hashedPassword: "password",
  };

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
      "CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"
    );
  });

  afterEach(async () => {
    await testDB.query("DROP TABLE IF EXISTS pg_temp.users");
  });

  describe("getUserById function", () => {
    it("should exist", async () => {
      expect(User.getUserById()).toBeDefined();
    });

    it("should return false if id does not exist in the database", async () => {
      expect(await User.getUserById(10)).toBe(false);
    });

    it("should return the correct user if the specified id exists in the database", async () => {
      const newUser = await User.create(user);

      const { user_id } = newUser;
      expect(await User.getUserById(user_id)).toStrictEqual(newUser);
    });
  });

  describe("getUserByUsername function", () => {
    it("should exist", async () => {
      expect(User.getUserByUsername()).toBeDefined();
    });

    it("should return false if username does not exist in the database", async () => {
      expect(await User.getUserByUsername("electro")).toBe(false);
    });

    it("should return the correct user if the specified username exists in the database", async () => {
      const newUser = await User.create(user);

      const { username } = newUser;
      expect(await User.getUserByUsername(username)).toStrictEqual(newUser);
    });
  });

  describe("create function", () => {
    it("should exist", async () => {
      expect(User.create(user)).toBeDefined();
    });

    it("should create the user in the database and return it as an object", async () => {
      const newUser = await User.create(user);

      const expectedUser = newUser;

      expect(expectedUser).toStrictEqual(newUser);
    });
  });

  describe("destroy function", () => {
    it("should exist", async () => {
      const newUser = await User.create(user);
      expect(newUser.destroy()).toBeDefined();
    });

    it("should delete a user created in the database and return that deleted user object", async () => {
      const newUser = await User.create(user);

      const deletedUser = await newUser.destroy();
      expect(deletedUser).toStrictEqual(newUser);
    });
  });

  describe("updateCurrency function successfully updates an existing users currency", () => {
    it("should exist", async () => {
      const newUser = await User.create(user);
      expect(newUser.updateCurrency(10000)).toBeDefined();
    });

    it("it should successfully update a users currency", async () => {
      const createdUser = await User.create(user);
      const expectedUserCurrency = 10000;

      const updatedUser = await createdUser.updateCurrency(10000);
      const { currency } = updatedUser;

      expect(currency).toEqual(expectedUserCurrency);
    });
  });
});
