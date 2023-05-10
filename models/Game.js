const db = require("../database/connect");

class Games {
    constructor({ instance_id, app_id, game_name, playtime, user_id, game_description, genres, background_image}) {
        this.instance_id = instance_id;
        this.app_id = app_id;
        this.game_name = game_name;
        this.playtime = playtime;
        this.user_id = user_id;
        this.game_description = game_description;
        this.genres = genres;
        this.background_image = background_image;
    }

    static async getAllGamesForUser(id) {
        const response = await db.query("SELECT * from games WHERE user_id = $1",
        [id]);
        if (response.rows.length < 1) {
            throw new Error("Cannot find a game(s) with that User ID.");
        }
        return response.rows.map((g) => new Games(g));
    };

    static async create(data) {
        const {app_id, game_name, playtime, user_id, game_description, genres, background_image} = data;
        const response = await db.query(
            "INSERT INTO games (app_id, game_name, playtime, user_id, game_description, genres, background_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            [app_id, game_name, playtime, user_id, game_description, genres, background_image]
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
