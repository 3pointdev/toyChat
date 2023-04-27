const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message) => {
    console.log("received: ", message);
  });
  socket.emit("message", "hello from server");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(8080, () => {
  console.log("Server started on port 8080");
});
