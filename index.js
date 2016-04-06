'use strict'
const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');
let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, function(err, data){
  if (err) throw error

  JSON.parse(data).forEach((user) => {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  });
});

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index', { users: users });
});

app.get('/:username', (req, res) => {
  let username = req.params.username
  res.json(username)
});


const server = app.listen(5000, () => {
  console.log("Server running at http://localhost:" + server.address().port);
});
