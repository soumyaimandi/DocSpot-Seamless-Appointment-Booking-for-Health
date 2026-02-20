require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");

const app = express();

// CONNECT DB
connectToDB();
const mongoose = require("mongoose");

connectToDB();

mongoose.connection.once("open", () => {
  console.log("CONNECTED DB NAME:", mongoose.connection.name);
});


// 🔥 ADD THESE TWO LINES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.get("/", (req, res) => {
  res.send("DocSpot Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
