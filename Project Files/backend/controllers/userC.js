const User = require("../schemas/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// REGISTER USER
// ======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Register failed",
    });
  }
};

// ======================
// LOGIN USER
// ======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Compare password (IMPORTANT)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET
,
  { expiresIn: "1d" }
);


    // 4️⃣ Send response
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
