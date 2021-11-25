-- Create table for user

CREATE TABLE IF NOT EXISTS user (
  user_id serial,
  first_name varchar(30),
  last_name varchar(30),
  email varchar(128) UNIQUE NOT NULL,
  password varchar(260) NOT NULL,
  PRIMARY KEY (user_id)
);


INSERT INTO user(first_name, last_name, email, password) VALUES ('John', 'Doe', 'johndoe@example.com','$2a$10$Nyl..HUfKHr65wY3pc3XnOJJFSlSk.kgx.2v11VpfpAtvBlzbST3m');

INSERT INTO user(first_name, last_name, email, password) VALUES ('Frank', 'Map', 'idkdoe@example.com','$2a$10$KHgJG16r8v9WkChV6zB2gusUkW4Ak8hJg.MF/F18hE8UijKlkBT8u');

