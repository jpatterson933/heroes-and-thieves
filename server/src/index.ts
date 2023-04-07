// Module Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Routers
import heroRouter from './routes/heroes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome Heroes and Theives!");
});

app.use("/api", heroRouter);

app.listen(8000, () => console.log("🚀 Server now live at http://localhost:8000"));
