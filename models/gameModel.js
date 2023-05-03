const db = require("../database/connect");

class Games {
    constructor({ instance_id, game_name, playtime, app_id, user_id}) {
        this.instance_id = instance_id;
        this.game_name = game_name;
        this.playtime = playtime;
        this.app_id = app_id;
        this.user_id = user_id;
    }

    static async getById(id) {
        const response = await db.query("SELECT * from games WHERE instance_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find that Instance ID.");
        }
        return new Games(response.rows[0]);
    };

    static async getByUserId(id) {
        const response = await db.query("SELECT * from games WHERE user_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find a game(s) with that User ID.");
        }
        return new Games(response.rows[0]);
    };

    static async getByAppId(id) {
        const response = await db.query("SELECT * from games WHERE app_id = $1",
        [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find a game(s) with that App ID.");
        }
        return new Games(response.rows[0]);
    };

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1",
        [username]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find user with that Username.");
        }
        return new User(response.rows[0]);
    };

    static async create(data) {
        const {username, password} = data;
        const response = await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
            [username, password]
        );
        //const newId = response.rows[0].user_id;
        //const newUser = await User.getOneById(newId);
        //return newUser; 
        return new User(response.rows[0]);           
    };

    async update(data) {
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
    };
}

module.exports = Games;
