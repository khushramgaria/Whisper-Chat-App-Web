import express from "express";
import router from "./routes/routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", message: "SERVER IS RUNNING !!" });
});

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
