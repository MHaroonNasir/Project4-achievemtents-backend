// imports
const db = require("../database/connect.js");


// user class model, constructor takes the user object returned by database
class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.steam_id = user.steam_id;
    this.username = user.username;
    this.password = user.password;
    this.currency = user.currency;
  }

  // static function to select user by id
  static async getUserById(id) {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1;", [
      id,
    ]);

    // if no user is found, return false, else return the User
    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // static function to select user by username
  static async getUserByUsername(username) {
    const result = await db.query("SELECT * FROM users WHERE username = $1;", [
      username,
    ]);

    // if no user is found, return false, else return the User
    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // static function to create a new user
  static async create(newUser) {
    // destructure the values passed from the controller
    const { steam_id, username, hashedPassword } = newUser;

    // insert into the users table and return the inserted User
    const result = await db.query(
      "INSERT INTO users (steam_id, username, password) VALUES ($1, $2, $3) RETURNING *;",
      [steam_id, username, hashedPassword]
    );

    return new User(result.rows[0]);
  }

  // function to delete a user from the database, called on a User instance in the controller
  async destroy() {
    const result = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );
    return new User(result.rows[0]);
  }

  // function to update the currency of the currently logged in user with a new amount passed in by the request body
  async updateCurrency(newCurrency) {
    const result = await db.query(
      "UPDATE users SET currency = $1 WHERE user_id = $2 RETURNING *;",
      [newCurrency, this.user_id]
    );
    return new User(result.rows[0]);
  }
}


module.exports = User;
