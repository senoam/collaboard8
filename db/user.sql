-- Create table for users

CREATE TABLE IF NOT EXISTS users (
  user_id serial,
  first_name varchar(30),
  last_name varchar(30),
  email varchar(128) UNIQUE NOT NULL,
  password varchar(260) NOT NULL,
  PRIMARY KEY (user_id)
);


INSERT INTO users(first_name, last_name, email, password) VALUES ('John', 'Doe', 'johndoe@example.com','admin1234');

INSERT INTO users(first_name, last_name, email, password) VALUES ('Frank', 'Map', 'idkdoe@example.com','haha1234');

