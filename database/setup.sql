DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    steam_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    currency INT DEFAULT 0,
    PRIMARY KEY (user_id)
);


CREATE TABLE games (
    instance_id INT GENERATED ALWAYS AS IDENTITY,
    app_id INT NOT NULL,
    game_name VARCHAR(255) NOT NULL,
    playtime INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (app_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


CREATE TABLE achievements (
    achievement_id INT GENERATED ALWAYS AS IDENTITY,
    achievement_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    app_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (achievement_id),
    FOREIGN KEY (app_id) REFERENCES games (app_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


CREATE TABLE user_sessions (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");
