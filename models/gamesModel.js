const db = require("../database/connect");

class Games {
    constructor({ app_id, game_name}) {
        this.app_id = app_id;
        this.game_name = game_name;
    }

    static async getById(id) {
        const response = await db.query("SELECT * from games WHERE app_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find that Instance ID.");
        }
        return new Games(response.rows[0]);
    };

    static async create(data) {
        const {game_name} = data;
        const response = await db.query(
            "INSERT INTO games (game_name) VALUES ($1) RETURNING *;",
            [game_name]
        );
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
