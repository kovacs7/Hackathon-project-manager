const express = require("express");
const router = express.Router();
const {
  SignUp,
  Login,
  AccountsInfo,
  searchUsers,
  fetchUsernames,
} = require("../controllers/authController");

router.post("/signup", SignUp);

router.post("/login", Login);

router.get("/accountsinfo", AccountsInfo);

router.get("/users/search", searchUsers);

router.post("/fetch-usernames", fetchUsernames);

module.exports = router;
