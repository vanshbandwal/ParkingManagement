const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, companyPassword, companyName } = req.body;

    // Check required fields
    if (!name || !email || !password || !companyPassword || !companyName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(name, email, password, companyName, companyPassword);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      companyName,
      companyPassword,
    });

    // Optionally: create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "SECRET123",
      {
        expiresIn: "1d",
      }
    );

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, companyPassword } = req.body;

    if (!email || !password || !companyPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch)
      return res.status(401).json({ message: "Invalid password" });
    if (companyPassword !== user.companyPassword) {
      console.log(companyPassword,user.companyPassword)
      return res.status(400).json({ message: "Invalid company code" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, "SECRET123", {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, logout };
