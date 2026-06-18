const express = require("express");
const router = express.Router();
const upload = require("../services/uploadService");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyToken, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File tidak ditemukan, pastikan field name adalah 'file'",
      });
    }

    res.status(200).json({
      success: true,
      message: "File berhasil diupload",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: `/upload/${req.file.filename}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
