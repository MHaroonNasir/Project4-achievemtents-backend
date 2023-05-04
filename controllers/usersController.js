// imports
const bcrypt = require("bcrypt");
const User = require("../models/User.js");


// function to display the user currently logged in
async function displayCurrentUser(req, res) {
  const user = await User.getUserById(req.session.userid);

  if (user) {
    const { steam_id, username, currency } = user;
    const sendUser = {
      steam_id,
      username,
      currency,
    };
    res.status(200).json(sendUser);
  } else {
    res.status(404).json({error: "No user with that id found!"});
  }
}


// function to display a user depending on the id in the url
async function displayUser(req, res) {
  const user = await User.getUserById(req.params.id);

  if (user) {
    const { steam_id, username, currency } = user;
    const sendUser = {
      steam_id,
      username,
      currency,
    };
    res.status(200).json(sendUser);
  } else {
    res.status(404).json({error: "No user with that id found!"});
  }
}


// function to register the user
async function registerUser(req, res) {
  // destructuring the request body to get user form data
  const { steam_id, username, password } = req.body;

  const userExists = await User.getUserByUsername(username);

  if (userExists) {
    return res.status(400).json({error: "User with that email already exists. Please choose another."});
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      steam_id,
      username,
      hashedPassword,
    };

    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  }
}


// function to login the user
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // check if user with the specified email exists, if not send an error message
    const user = await User.getUserByUsername(username);

    if (!user) {
      res.status(404).json({error: "No user registered with that email!"});
      return;
    }

    // compare the password given and the hashed password stored in the database, if they dont match send error else set the user to be authenticated with cookie
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(400).json({error: "Incorrect password!"});
      return;
    } else {
      req.session.userid = user.user_id;
      req.session.username = user.username;
      req.session.steam_id = user.steam_id;
      req.session.currency = user.currency;
      res.status(200).json(req.session);
      console.log(
        `User with username: ${req.session.username} just logged in!`
      );
    }
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
}


// function to logout the user
async function logoutUser(req, res) {
  console.log(`User with username: ${req.session.username} just logged out!`);
  req.session.userid = null;
  req.session.username = null;
  req.session.steam_id = null;
  req.session.currency = null;
  res.status(200).json({message: "Successfully logged out!"});
}


// function to delete a user
async function destroyUser(req, res) {
  const user = await User.getUserById(req.session.userid);

  const deletedUser = await user.destroy();
  req.session.userid = null;
  req.session.username = null;
  req.session.steam_id = null;
  req.session.currency = null;
  res.status(200).json(deletedUser);
}


module.exports = {
  displayCurrentUser,
  displayUser,
  registerUser,
  loginUser,
  logoutUser,
  destroyUser,
};
