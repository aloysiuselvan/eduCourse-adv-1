require("dotenv").config();
const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Edu Course API!" });
});

app.use("/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
