const express = require("express");
const gamesRouter = express.Router();
const steamController = require("../controllers/steamController");

gamesRouter.get("/games/:id", steamController.getAllGames)
gamesRouter.get("/achievements", steamController.getAllAchievements)

module.exports = gamesRouter;
