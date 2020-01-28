const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.sockets.on("connection", socket => {
  socket.on("username", username => {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " join the chat..</i>");
  });

  socket.on("disconnect", username => {
    io.emit("is_online", "🔴 <i>" + socket.username + " left the chat..</i>");
  });

  socket.on("chat_message", message => {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

const PORT = process.env.PORT || 5000;
const server = http.listen(PORT, () => {
  console.log("listening on 5000");
});
// listen using http or express are the same, under the hood, express are using http to listen,
// we separate out is because socket.io need http also
