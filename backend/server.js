const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();

// Load the JSON manually and use in-memory data
const data = require("./db.json");
const router = jsonServer.router(data);

const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
