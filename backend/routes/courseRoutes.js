const express = require("express");
const router = express.Router();
const kelasService = require("../services/kelasService");

router.get("/", async (req, res) => {
  try {
    const data = await kelasService.getAllKelas();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await kelasService.getKelasById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await kelasService.createKelas(req.body);
    res.status(201).json({ success: true, data, message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await kelasService.updateKelas(req.params.id, req.body);
    res.status(200).json({ success: true, data, message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await kelasService.deleteKelas(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
