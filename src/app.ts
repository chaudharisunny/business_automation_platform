import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

const PORT = 5000;

import { pool } from "./config/db";
import routes from "./modeules/routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "welcome"
  });
});

pool.connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(
      "Database connection failed",
      err
    );
  });

app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`server connect to ${PORT}`);
});