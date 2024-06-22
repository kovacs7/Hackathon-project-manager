const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helper/auth");

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
    const checkPassword = await comparePassword(password, userExist.password);

    if (checkPassword) {
      const token = jwt.sign(
        { email: email, username: userExist.username, name: userExist.name },
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

module.exports = { SignUp, Login, AccountsInfo };
