// imports
const { Router } = require("express");
const auth = require("../middleware/auth.js");
const {
    registerUser,
    loginUser,
    logoutUser,
    displayCurrentUser,
    destroyUser,
    displayUser,
} = require("../controllers/usersController.js");

// initialising router
const router = Router();

// users routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/current", auth, displayCurrentUser);
router.delete("/delete", auth, destroyUser);
router.get("/:id", displayUser);


module.exports = router;
