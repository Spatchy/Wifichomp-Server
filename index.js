const express = require("express")
const http = require("http")
const socketIO = require("socket.io")
require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const token = process.env.SENSOR_API_TOKEN

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
  console.log("A client connected")
  
  socket.on("wifiData", (data) => {
    console.log(data.networks)
    console.log(token)
    if (data.token === token) {
      io.sockets.emit("wifiDataForDisplay", data.networks)
    }
  })

  socket.on("disconnect", () => {
    console.log("A client disconnected")
  })
})

const port = 8484
server.listen(port, () => {
  console.log(`Server is running port ${port}`)
})
