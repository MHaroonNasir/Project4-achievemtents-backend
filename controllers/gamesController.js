const Games = require('../models/Game.js');

  async function show(req, res) {
    try {
      const gameId = req.params.id;
      const result = await Games.getAllGamesForUser(gameId);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function create(req, res) {
    try {
        const data = req.body;
        const newGame = await Games.create(data);
        res.status(201).json(newGame);
    } catch(err) {
        res.status(400).json({"error": err.message});
    }
  }

  module.exports = { show, create };
