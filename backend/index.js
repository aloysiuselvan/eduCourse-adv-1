require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Edu Course API!" });
});

app.use("/course", courseRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
