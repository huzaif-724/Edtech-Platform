const express = require("express");
const router = express.Router();

const { login, signup, sendotp, logout } = require("../controllers/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/signup", signup);  // Handles user signup
router.post("/login", login);    // Handles user login
router.post("/sendotp", sendotp);
router.post("/logout", logout); 

module.exports = router; // Ensure the router is exported
