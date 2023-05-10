# SteamAchiev Backend Server

## Link to SteamAchiev client: https://github.com/Sonagi-R/achievements

## Setup
1. Clone repo using either HTTP or SSH link from GitHub
2. In the root directory, run ``` npm i ``` to install all required dependancies
3. Create a database on ElephantSQL or any DBMS of your choice, copy the database url
4. Create a .env file inside the root directory with the values: -PORT='port number you want to use'  -DB_URL=url to the database  -SECRET=random string for the session secret
5. Run ``` npm run setup-db ``` inside the root directory to populate the database with the correct tables
6. Run ``` npm run dev ``` inside the root directory to start the server


## Routes
### User routes  /users

| Route           | METHOD      | Description                                                                                                                 |
| --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| /register       | POST        | registers a new user into the database, returns a JSON object of the created user or an error                               |
| /login          | POST        | logs in the user if they provide correct details and creates a new session, returns the session object or an error          |
| /logout         | GET         | logs out the current user , returns a JSON object with a message                                                            |
| /current        | GET         | gets the logged in users details and returns the username, steam_id and currency as a JSON object                           |
| /:id            | GET         | gets the users details with the specified id and returns the username, steam_id and currency as a JSON object or an error   |
| /delete         | DELETE      | deletes the current logged in user from the database and returns the deleted user as a JSON object                          |
| /updatecurrency | PATCH       | updates the currency of the logged in user with a new value, returns the user as a JSON object                              |

### Item routes  /items

| Route           | METHOD      | Description                                                                                                                 |
| --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| /               | GET         | returns an array of objects containing the details of all items in the store                                                |
| /:id            | GET         | returns an object containing the details of an item of specified id in the store                                            |
| /:id            | PATCH       | initiates a purchase of a specific item by a specific user, deducts users currency and items quantity                       |
