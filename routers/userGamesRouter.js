const express = require("express");
const gamesRouter = express.Router();
const userGamesController = require("../controllers/userGamesController");

gamesRouter.get("/user/:id", userGamesController.showByUserId)
gamesRouter.get("/app/:id", userGamesController.showByAppId)
gamesRouter.post("/new", userGamesController.create)

module.exports = gamesRouter;
