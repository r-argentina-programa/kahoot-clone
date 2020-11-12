const client = require('socket.io:client');
const express = require('express');

const app = express();

let socket;

app.get('/connect', (req, res) => {
  const url = req.query.url;

  socket = client(url);

  socket.on('connect', () => {
    res.sendStatus(200);
  });
});

app.get('/message', (req, res) => {
  const msg = req.query.m;

  socket.send(msg, () => {
    res.sendStatus(200);
  });
});

app.get('/disconnect', (req, res) => {
  socket.on('disconnect', () => {
    res.sendStatus(200);
  });

  socket.disconnect();
});

app.listen(8080, () => {});
