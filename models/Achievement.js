const db = require("../database/connect");

class Achievements {
    constructor({ achievement_id, achievement_name, description, icon, app_id, user_id}) {
        this.achievement_id = achievement_id;
        this.achievement_name = achievement_name;
        this.description = description;
        this.icon = icon;
        this.app_id = app_id;
        this.user_id = user_id;
    }

    static async getAllAchievementsForUser(id) {
        const response = await db.query("SELECT * from achievements WHERE user_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find a game(s) with that User ID.");
        }
        return new Achievements(response.rows[0]);
    };

    static async getAllAchievementsForSpecificGame(user_id, app_id) {
        const response = await db.query("SELECT * from achievements WHERE user_id = $1 AND app_id = $2",
        [user_id, app_id]);
        if (response.rows.length < 1) {
            throw new Error("Cannot find achievements for that game.");
        }
        return response.rows.map((a) => new Achievements(a));
    };

    static async create(data) {
        const {achievement_name, description, icon, app_id, user_id} = data;
        const response = await db.query(
            "INSERT INTO achievements (achievement_name, description, icon, app_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [achievement_name, description, icon, app_id, user_id]
        );
        return new Achievements(response.rows[0]);           
    };
}

module.exports = Achievements;
