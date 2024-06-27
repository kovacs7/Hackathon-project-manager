const {
  userModel,
  chatModel,
  canvasModel,
  projectModel,
  taskModel,
} = require("../models/models.js");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helper/auth");
const mongoose = require("mongoose")

const SignUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.json({ error: "Please enter all the fields in the form." });
    }
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken." });
    }
    const usernameExist = await userModel.findOne({ username });
    if (usernameExist) {
      return res.json({ error: "Username is already taken." });
    }

    const hashedPassword = await hashPassword(password);
    const register = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.json(register);
  } catch (error) {
    console.log("Error in SignUp controller", error); // For debugging
    return res.json({ error: "Error occured while registering." });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Please enter all the fields in the form." });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.json({
        error: "The user does not exist.\nPlease sign up first.",
      });
    }
    console.log(userExist)
    const checkPassword = await comparePassword(password, userExist.password);

    if (checkPassword) {
      const token = jwt.sign(
        { email: email, username: userExist.username, name: userExist.name, _id : userExist._id},
        process.env.JWT_SECRET,
        {},
        function (err, token) {
          if (err) {
            console.log("Error in JWT token fn :", err);
          }
          return res
            .cookie("userToken", token)
            .json({ success: "Successfully logged In. Welcome Back!" });
        }
      );
    }
    if (!checkPassword) {
      return res.json({ error: "Incorrect password. Please try again." });
    }
  } catch (error) {
    res.json({ error: "Error occured while logging in." });
  }
};

const AccountsInfo = (req, res) => {
    const {userToken} = req.cookies
    if (userToken){
        jwt.verify(userToken, process.env.JWT_SECRET, function (err, decoded) {
          if (err) {
            return res.json({
              error: "Error occured while JWT token Authentication.",
            });
          }
          return res.json(decoded);
        });
    }
    else{
        return res.json(null);
    }
};

const searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const users = await userModel.find({
      username: { $regex: query, $options: "i" },
    }).select("username");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const fetchUsernames = async (req, res) => {
  try {
    const { objectIds } = req.body;

    if (!objectIds || !Array.isArray(objectIds) || objectIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: objectIds must be a non-empty array" });
    }

    // Ensure all objectIds are strings
    const validObjectIds = objectIds.every(
      (id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id)
    );
    if (!validObjectIds) {
      return res
        .status(400)
        .json({ error: "Invalid input: All objectIds must be valid strings" });
    }

    // Fetch usernames based on provided ObjectIds
    const users = await userModel
      .find({
        _id: { $in: objectIds.map((id) => new mongoose.Types.ObjectId(id)) },
      })
      .select("_id username");

    res.json({ usernames: users });
  } catch (error) {
    console.error(error);

    // Check for specific types of errors and respond accordingly
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    res
      .status(500)
      .json({ error: "An error occurred while fetching usernames" });
  }
};


module.exports = { SignUp, Login, AccountsInfo, searchUsers, fetchUsernames};
