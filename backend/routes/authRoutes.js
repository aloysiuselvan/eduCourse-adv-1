const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi (fullname, username, email, password)",
      });
    }

    const user = await authService.register({ fullname, username, email, password });

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: user,
    });
  } catch (error) {
    const statusCode = error.message.includes("sudah") ? 409 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/verifikasi-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const message = await authService.verifyEmail(token);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
