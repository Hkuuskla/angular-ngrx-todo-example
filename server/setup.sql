-- mysqladmin -u root -p drop angular_ngrx_todo_example

CREATE DATABASE IF NOT EXISTS angular_ngrx_todo_example DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS angular_ngrx_todo_example.users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL,
  firstname VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS angular_ngrx_todo_example.tasks (
  task_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  description VARCHAR(1000),
  date DATE,
  time TIME,
  done BOOLEAN,
  archived BOOLEAN
);
