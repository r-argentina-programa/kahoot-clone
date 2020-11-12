require('dotenv').config();

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const { setRoutes } = require('./src/controller/controller');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded());

setRoutes(app, io);
