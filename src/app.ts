import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";

const PORT = Number(process.env.PORT) || 5000;

import { pool } from "./config/db";
import routes from "./modeules/routes";

const app = express();

app.use(cors());
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