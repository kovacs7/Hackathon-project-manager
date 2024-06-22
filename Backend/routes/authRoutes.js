const express = require("express");
const router = express.Router();
const {SignUp, Login, AccountsInfo} = require("../controllers/authController")

router.post("/signup" , SignUp)

router.post("/login", Login)

router.get("/accountsinfo", AccountsInfo)

module.exports = router