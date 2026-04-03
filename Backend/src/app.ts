import express from "express";
import { clerkMiddleware } from "@clerk/express";
import router from "./routes/routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", message: "SERVER IS RUNNING !!" });
});

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
