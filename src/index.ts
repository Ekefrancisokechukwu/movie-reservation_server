import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
import { closeDB } from "./config/db";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

process.on("SIGTERM", async () => {
  closeDB();
  console.log("Server shutting down gracefully...");
  process.exit(0);
});

function start() {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
}

start();
