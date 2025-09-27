const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/players");

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/players", playerRoutes);

// connect to MongoDB (use lowercase db name)
mongoose
  .connect("mongodb://localhost:27017/packers", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("❌ Failed to connect:", err));
