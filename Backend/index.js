const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("database connected");
}).catch((Error) => {
    console.log("Error in Connecting to the Server" , Error)
})

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);


app.use("/" , require("./routes/authRoutes"))

app.listen(PORT, () => {
  console.log(`server is runnung On ${PORT}`);
});
