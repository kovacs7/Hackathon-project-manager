const express = require("express");
const router = express.Router();
const {
  SignUp,
  Login,
  AccountsInfo,
  searchUsers,
  fetchUsernames,
  getAllUsers,
} = require("../controllers/authController");

router.post("/signup", SignUp);

router.post("/login", Login);

router.get("/accountsinfo", AccountsInfo);

router.get("/users/search", searchUsers);

router.get("/users", getAllUsers)

router.post("/fetch-usernames", fetchUsernames);

module.exports = router;
