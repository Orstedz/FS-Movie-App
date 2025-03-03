import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
