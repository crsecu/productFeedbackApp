const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Load the JSON manually and use in-memory data
const data = require("./db.json");
const router = jsonServer.router(data);

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
