import express from "express";
import cors from "cors";
import { config } from "dotenv";

import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import userRoute from "./routes/v1/user.routes.js";
import authRoute from "./routes/v1/auth.routes.js";

import DBConnect from "./utils/DBConnect.js";

config();

DBConnect();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "64 kb" }));

// gives the request information
app.use(morgan("dev")); // Logging of Request and Response

app.use(compression()); // compress the data and send using gzip

app.use(helmet()); //Remove unnecessary Data from header

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/post", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
