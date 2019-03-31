const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');

const mysqlSetupScript = fs.readFileSync(__dirname + '/setup.sql', 'utf8');

const db = mysql.createConnection({
  host:               config.db.host,
  user:               config.db.user,
  password:           config.db.password,
  multipleStatements: true
});

db.query(mysqlSetupScript, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Done!');
  }
  process.exit();
});
