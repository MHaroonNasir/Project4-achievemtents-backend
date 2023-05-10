const express = require("express");
const gamesRouter = express.Router();
const achievementsController = require("../controllers/achievementsController");

gamesRouter.get("/:id", achievementsController.showAll)
gamesRouter.post("/", achievementsController.showSpecific)
gamesRouter.post("/new", achievementsController.create)

module.exports = gamesRouter;
