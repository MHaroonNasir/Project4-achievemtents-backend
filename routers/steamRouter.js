const express = require("express");
const gamesRouter = express.Router();
const steamController = require("../controllers/steamController");

gamesRouter.get("/games/:id", steamController.getAllGames)
gamesRouter.get("/achievements/", steamController.getAllAchievements)
gamesRouter.get("/achievementsinfo/:id", steamController.getMoreAchievementInfo)

module.exports = gamesRouter;
