-- Create table for users

CREATE TABLE IF NOT EXISTS users (
  user_id serial,
  first_name varchar(30),
  last_name varchar(30),
  email varchar(20),
  password varchar(260),
  PRIMARY KEY (user_id)
);


INSERT INTO users(first_name, last_name, email, password) VALUES ('John', 'Doe', 'johndoe@example.com','admin1234');
