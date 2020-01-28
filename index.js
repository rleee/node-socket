const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("Hello");
});

const server = http.listen(5000, () => {
  console.log("listening on 5000");
});
// listen using http or express are the same, under the hood, express are using http to listen,
// we separate out is because socket.io need http also
