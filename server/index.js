const bcrypt = require('bcrypt');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const moment = require('moment')

const config = require('./config');

const db = mysql.createConnection(config.db);

const server = express();
server.use(cors({
  origin: true,
  credentials: true
}));
server.use(bodyParser.json());
server.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

server.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

server.post('/auth/login', async (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';

  const username = req.body.username;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(400).send(); // Bad request
    } else if (results.length) {
      const user  = results[0];
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.userId = user['user_id'];

        res.send({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname
        }); // OK
      } else {
        console.log('Wrong password for user', req.body.username);
        res.status(401).send(); // Unauthorized
      }
    } else {
      console.log('User does not exist', req.body.username);
      res.status(401).send(); // Unauthorized
    }
  });
});

server.post('/auth/register', async (req, res) => {
  const sql = 'INSERT INTO users SET ?';

  const passwordHash = await bcrypt.hash(req.body.password, config.saltRounds);

  const user = {
    username:  req.body.username,
    password:  passwordHash,
    firstname: req.body.firstname,
    lastname:  req.body.lastname
  }

  db.query(sql, user, (err, result) => {
    if (err && err.code === 'ER_DUP_ENTRY') {
      console.error(err);
      res.status(409).send(); // Conflict, username already exists
    } else if (err) {
      console.error(err);
      res.status(400).send(); // Bad request
    } else {
      console.log('userId = ', result.insertId);
      req.session.userId = result.insertId;

      res.send({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }); // OK
    }
  });
});

server.get('/auth/logout', (req, res) => {
  req.session.userId = null;
  res.send();
});

server.post('/auth/forgot', (req, res) => {
  console.log('User has forgotten the password', req.body.username);
  res.send();
});

server.get('/task', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send(); // Unauthorized
  }

  const sql = 'SELECT * FROM tasks WHERE user_id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      res.status(400).send(); // Bad request
      console.error(err);
    } else {
      res.send(results.map((task) => ({
        id: task['task_id'],

        description: task.description,
        date:        task.date ? moment(task.date).format('YYYY-MM-DD') : null,
        time:        task.time,
        done:        task.done,
        archived:    task.archived
      })));
    }
  });
});

server.post('/task', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send(); // Unauthorized
  }

  const task = {
    'user_id': userId,

    description: req.body.description,
    date:        req.body.date,
    time:        req.body.time,
    done:        req.body.done,
    archived:    req.body.archived
  };

  const sql = 'INSERT INTO tasks SET ?';

  db.query(sql, task, (err, result) => {
    if (err) {
      res.status(400).send(); // Bad request
      console.error(err);
    } else {
      res.send({
        id:          result.insertId,
        description: req.body.description,
        date:        req.body.date,
        time:        req.body.time,
        done:        req.body.done,
        archived:    req.body.archived
      });
    }
  });
});

server.put('/task', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send(); // Unauthorized
  }

  const taskId      = req.body.id;
  const description = req.body.description;
  const date        = req.body.date;
  const time        = req.body.time;
  const done        = req.body.done;
  const archived    = req.body.archived;

  const sql = `
    UPDATE tasks SET
      description = ?,
      date = ?,
      time = ?,
      done = ?,
      archived = ?
    WHERE
      task_id = ?
      AND
      user_id = ?
  `;

  db.query(sql, [description, date, time, done, archived, taskId, userId], (err, results) => {
    if (err) {
      res.status(400).send(); // Bad request
      console.error(err);
    } else {
      res.send(); // OK
    }
  });
});

server.delete('/task/:id', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send(); // Unauthorized
  }

  const taskId = req.params.id;

  const sql = `
    DELETE FROM tasks
    WHERE
      task_id = ?
      AND
      user_id = ?
  `;

  db.query(sql, [taskId, userId], (err, results) => {
    if (err) {
      res.status(400).send(); // Bad request
      console.error(err);
    } else {
      res.send(); // OK
    }
  });
});

server.listen(config.port, function() {
  console.log('Listening on port %s', config.port);
});
