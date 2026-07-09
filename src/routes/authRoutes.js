const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");

console.log(controller);
console.log(typeof controller.registerUser);

router.post("/register", controller.registerUser);

module.exports = router;