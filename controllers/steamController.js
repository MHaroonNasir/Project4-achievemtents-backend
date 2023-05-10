const Achievements = require('../models/Achievement');
const Games = require('../models/Game.js');
const User = require("../models/User.js");
require("dotenv").config();

const steamWebApiKey = process.env.STEAM_WEB_API_KEY;

async function getAllGames(req, res) {
    try {
        const userId = req.params.id;
        const getOwnedGames = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamWebApiKey}&include_appinfo=true&steamid=${userId}&format=json`);
        const ownedGamesData = await getOwnedGames.json();
        //console.log(ownedGamesData)
        res.status(200).send(ownedGamesData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAllAchievements(req, res) {
    try {
        console.log("called")
        const appId = req.query.appid;
        const steamId = req.query.steamid;
        console.log(appId, steamId)
        const getOwnedAchievements = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${steamWebApiKey}&steamid=${steamId}`);
        const ownedAchievementsData = await getOwnedAchievements.json();
        //console.log(ownedAchievementsData)
        res.status(200).send(ownedAchievementsData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getAllGames, getAllAchievements };
