// imports
const { Router } = require("express");
const auth = require("../middleware/auth.js");
const {
    displayAllItems,
    displayItem,
    purchaseItem,
} = require("../controllers/itemsController.js");

// initialising router
const router = Router();

// items routes
router.get("/", auth, displayAllItems);
router.get("/:id", auth, displayItem);
router.patch("/:id", auth, purchaseItem);

module.exports = router;
