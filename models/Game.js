const db = require("../database/connect");

class Games {
    constructor({ instance_id, app_id, game_name, playtime, user_id}) {
        this.instance_id = instance_id;
        this.app_id = app_id;
        this.game_name = game_name;
        this.playtime = playtime;
        this.user_id = user_id;
    }

    static async getAllGamesForUser(id) {
        const response = await db.query("SELECT * from games WHERE user_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find a game(s) with that User ID.");
        }
        return new Games(response.rows[0]);
    };

    static async create(data) {
        const {app_id, game_name, playtime, user_id} = data;
        const response = await db.query(
            "INSERT INTO games (app_id, game_name, playtime, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
            [app_id, game_name, playtime, user_id]
        );
        //const newId = response.rows[0].user_id;
        //const newUser = await User.getOneById(newId);
        //return newUser; 
        return new Games(response.rows[0]);           
    };

    /*async update(data) {
        const {username, password, es_score, fr_score} = data;
        const response = await db.query(
            "UPDATE users SET username = $1, password = $2, es_score = $3, fr_score = $4 WHERE id = $5 RETURNING *;",
            [username, password, es_score, fr_score, this.id]
        );
        if (response.rows.length != 1) {
            throw new Error("Cannot find user with that Username.");
        }
        return new User(response.rows[0]);
    };

    async destroy() {
        const response = await db.query(
            "DELETE FROM users WHERE id = $1 RETURNING *;",
            [this.id]
        );
        return new User(response.rows[0]);
    };*/
}

module.exports = Games;
