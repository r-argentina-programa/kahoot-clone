require('dotenv').config({ path: `${__dirname}/.env` });

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const { Sequelize } = require('sequelize');
const { setRoutes } = require('./src/controller/controller');
const { initDb } = require('./src/cli/init.db');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));

(async () => {
  await initDb(sequelize);
  setRoutes(app, io);
})();
