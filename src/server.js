const app = require("./app");

const http = require("node:http");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

function start() {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
}

start();
