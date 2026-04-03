import app from "./src/app.js";
import { connectDB } from "./src/config/db.config.js";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket.util.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

initializeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1);
  });
