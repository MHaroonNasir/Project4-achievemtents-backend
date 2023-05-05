require("dotenv").config();
const User = require("./User.js");
const db = require("../database/connect.js");
const { Pool } = require("pg");

describe("User Model", () => {
  let testDB;
  const user = {
    username: "testuser",
    email: "testuser@gmail.com",
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
      expect(
        await User.getUserById("1cddc7e1-54a3-4e16-9d27-60786697cdb8")
      ).toBe(false);
    });

    it("should return the correct user if the specified id exists in the database", async () => {
      const newUser = await User.create(user);

      const { user_id } = newUser;
      expect(await User.getUserById(user_id)).toStrictEqual(newUser);
    });
  });

  describe("getUserByEmail function", () => {
    it("should exist", async () => {
      expect(User.getUserByEmail()).toBeDefined();
    });

    it("should return false if email does not exist in the database", async () => {
      expect(await User.getUserByEmail("testuser@gmail.com")).toBe(false);
    });

    it("should return the correct user if the specified email exists in the database", async () => {
      const newUser = await User.create(user);

      const { email } = newUser;
      expect(await User.getUserByEmail(email)).toStrictEqual(newUser);
    });
  });

  describe("create function", () => {
    it("should exist", async () => {
      expect(User.create(user)).toBeDefined();
    });

    it("should create the user in the database and return it as an object", async () => {
      const newUser = await User.create(user);

      const { username, email, password } = newUser;
      const returnedUser = {
        username: username,
        email: email,
        hashedPassword: password,
      };

      expect(returnedUser).toStrictEqual(user);
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
});