const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const checkRole = require("./middleware/roleMiddleware");
const verifyToken = require("./middleware/authMiddleware");

const SECRET_KEY = "mysecretkey";

const app = express();

app.use(cors());
app.use(express.json());


const users = [

  {
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
  },

  {
    email: "user@gmail.com",
    password: "user123",
    role: "user"
  }

];



app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const foundUser = users.find(
    u => u.email === email && u.password === password
  );

  if (foundUser) {

    const token = jwt.sign(
      {
        email: foundUser.email,
        role: foundUser.role
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login Successful",
      token: token
    });

  }

  else {

    res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });

  }

});


// PROTECTED ROUTE
app.get("/dashboard", verifyToken, (req, res) => {

  res.json({
    message: "Welcome to Dashboard",
    user: req.user
  });

});

app.get(
  "/admin",
  verifyToken,
  checkRole("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin",
      user: req.user
    });

  }
);

app.listen(5000, () => {

  console.log("Server running on port 5000");

});