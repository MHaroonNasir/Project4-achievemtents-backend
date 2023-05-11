const Achievements = require('../models/Achievement');

  async function showAll(req, res) {
    try {
      const userId = req.params.id;
      const result = await Achievements.getAllAchievementsForUser(userId);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function showSpecific(req, res) {
    try {
        const user_id = req.body.user_id;
        const app_id = req.body.app_id;
        console.log(user_id, app_id)
        const achievements = await Achievements.getAllAchievementsForSpecificGame(user_id, app_id);
        res.status(201).json(achievements);
    } catch(err) {
        res.status(400).json({"error": err.message});
    }
  }
  
  async function create(req, res) {
    try {
        const data = req.body;
        const newGame = await Achievements.create(data);
        res.status(201).json(newGame);
    } catch(err) {
        res.status(400).json({"error": err.message});
    }
  }
  
  module.exports = { showAll, showSpecific, create };
