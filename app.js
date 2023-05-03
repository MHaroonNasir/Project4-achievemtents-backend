const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const gamesRouter = require('./routers/gamesRouter')
const userGamesRouter = require('./routers/userGamesRouter')

app.use('game', gamesRouter)
app.use('usergame', userGamesRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})
