const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔹 Home route
app.get("/", (req, res) => {
  res.send(`
    <h2>Secure WebApp Backend</h2>
    <p>Use these endpoints:</p>
    <ul>
      <li>POST /api/auth/register → Register a new user</li>
      <li>POST /api/auth/login → Login with username & password</li>
      <li>GET /test → Test if server is reachable</li>
    </ul>
  `);
});

// 🔹 Test route
app.get("/test", (req, res) => {
  res.send("Server reachable!");
});

// Debug logging
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
