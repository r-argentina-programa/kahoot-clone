require('dotenv').config({ path: `${__dirname}/.env` });

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const { initKahootModule } = require('./src/module');
const configureDI = require('./src/config/di');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));

const container = configureDI();
app.use(container.get('Session'));

initKahootModule(app, io, container);
