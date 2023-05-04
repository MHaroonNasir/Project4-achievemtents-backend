const express = require("express");
const gamesRouter = express.Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/:id", gamesController.show)
gamesRouter.post("/new", gamesController.create)

module.exports = gamesRouter;
