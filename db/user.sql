-- Create table for users

CREATE TABLE IF NOT EXISTS users (
  user_id serial,
  first_name varchar(30),
  last_name varchar(30),
  password varchar(260),
  PRIMARY KEY (user_id)
);


INSERT INTO users(first_name, last_name, password) VALUES ('John', 'Doe', 'admin1234');
