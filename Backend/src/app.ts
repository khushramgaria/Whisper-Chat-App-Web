import express from "express";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", message: "SERVER IS RUNNING !!" });
});

app.use("/api/v1", router);

export default app;
