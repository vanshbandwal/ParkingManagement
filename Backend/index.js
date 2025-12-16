const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRoutes.js");
const ParkingRouter = require("./Routes/ParkinRoutes.js")

const app = express();
const port = 3000;

// MongoDB Connect
mongoose
  .connect("mongodb+srv://vanshbandwal93_db_user:a8hpZGiwNOcjx4SK@cluster0.mcdblt2.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRouter);
app.use("/api/parking", ParkingRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
