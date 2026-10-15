const http = require("http");

const server = http.createServer(function (request, response) {
  response.end("Hello from my first server!");
});

server.listen(3000, function () {
  console.log("Server is running at http://localhost:3000");
});