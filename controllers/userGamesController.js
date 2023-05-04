const Users_Games = require('../models/userGamesModel');

  async function showByUserId(req, res) {
    try {
      const gameId = req.params.id;
      const result = await Users_Games.getByUserId(gameId);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function showByAppId(req, res) {
    try {
      const gameId = req.params.id;
      const result = await Users_Games.getByAppId(gameId);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async function create(req, res) {
    try {
        const data = req.body;
        const newUserGame = await Users_Games.create(data);
        res.status(201).json(newUserGame);
    } catch(err) {
        res.status(400).json({"error": err.message});
    }
  }
  
  module.exports = { showByUserId, showByAppId, create };
