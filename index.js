import express from "express";
import dotenv from "dotenv";
import dbConnect from "./libs/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
