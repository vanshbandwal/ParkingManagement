const express = require("express");
const { register, login, logout } = require("../controller/authController.js");
const protected = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout)

// Dashboard protected route
router.get("/dashboard", protected, (req, res) => {
  res.json({ success: true, message: "Access granted" });
});

module.exports = router;
