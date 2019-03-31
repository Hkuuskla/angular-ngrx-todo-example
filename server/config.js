module.exports = {
  port:       process.env.PORT || 3000,
  saltRounds: 7,

  db: {
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'angular_ngrx_todo_example'
  }
};
