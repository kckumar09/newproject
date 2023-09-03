const dotenv = require("dotenv").config();
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require('express-fileupload');
var bodyParser = require("body-parser");
const commonsrc = require("./src/commonrouter");
const server = http.createServer(app);
const io = socketIo(server);



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload()); 

 mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>errr", err);
  } else {
    console.log(`DB connected ${process.env.PORT}`);
  }
});

app.use("/", commonsrc);
require('./socket')(io)
server.listen(process.env.PORT,()=>{
console.log("Server Connect")
})
