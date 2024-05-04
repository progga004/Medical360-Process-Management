const express = require("express");
const router = express.Router();
const { getUserEvents } = require("../controllers/event-controller");

router.get("/user/:userId", getUserEvents);


module.exports = router;



