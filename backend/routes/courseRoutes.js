const express = require("express");
const router = express.Router();
const kelasService = require("../services/kelasService");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.verifyToken, async (req, res) => {
  try {
    const data = await kelasService.getAllKelas(req.query);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", authMiddleware.verifyToken, async (req, res) => {
  try {
    const data = await kelasService.getKelasById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", authMiddleware.verifyToken, async (req, res) => {
  try {
    const { judul, kategoriId, tutorId, harga } = req.body;
    
    if (!judul || kategoriId === undefined || tutorId === undefined || harga === undefined) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: judul, kategoriId, tutorId, dan harga wajib diisi",
      });
    }

    const parsedKategoriId = parseInt(kategoriId);
    const parsedTutorId = parseInt(tutorId);
    const parsedHarga = parseFloat(harga);

    if (isNaN(parsedKategoriId) || isNaN(parsedTutorId) || isNaN(parsedHarga)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: kategoriId, tutorId, dan harga harus berupa angka",
      });
    }

    const data = await kelasService.createKelas(req.body);
    res.status(201).json({ success: true, data, message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:id", authMiddleware.verifyToken, async (req, res) => {
  try {
    const { kategoriId, tutorId, harga } = req.body;

    if (kategoriId !== undefined && isNaN(parseInt(kategoriId))) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: kategoriId harus berupa angka",
      });
    }

    if (tutorId !== undefined && isNaN(parseInt(tutorId))) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: tutorId harus berupa angka",
      });
    }

    if (harga !== undefined && isNaN(parseFloat(harga))) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: harga harus berupa angka",
      });
    }

    const data = await kelasService.updateKelas(req.params.id, req.body);
    res.status(200).json({ success: true, data, message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", authMiddleware.verifyToken, async (req, res) => {
  try {
    await kelasService.deleteKelas(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
