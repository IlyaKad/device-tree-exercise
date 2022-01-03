const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const cors = require("cors");
const usbDetect = require("usb-detection");

const wss = new WebSocket.Server({ server: server });

const PORT = 4040;

usbDetect.startMonitoring();

wss.on(
  "connection",
  (connection = (ws) => {
    console.log("A new client Connected!");
    ws.send("Welcome New Client!");

    usbDetect.on("add", (device) => {
      console.log("add", device);
      ws.send("Device connected");
    });

    usbDetect.on("remove", (device) => {
      console.log("remove", device);
      ws.send("Device disconnected");
    });
  })
);

app.get("/devices", cors(), async (req, res) => {
  try {
    const devices = await usbDetect.find();
    res.send(devices);
  } catch (error) {
    console.log(`error`, error);
    throw error;
  }
});

server.listen(PORT, () => console.log(`Server ready at port ${PORT}!`));
