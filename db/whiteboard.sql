-- Creating tables for the whiteboard

CREATE TABLE IF NOT EXISTS whiteboard_collaborator_role (
  role_id serial,
  role_name varchar(100),
  PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS whiteboard (
    whiteboard_id serial,
    whiteboard_title varchar(100),
    PRIMARY KEY (whiteboard_id)
  );

CREATE TABLE IF NOT EXISTS whiteboard_collaborator (
  whiteboard_id serial,
  user_id int, -- TODO: This would be a foreign key as well.
  user_role int,
  FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id),
  FOREIGN KEY (user_role) REFERENCES whiteboard_collaborator_role(role_id)
);




-- Populating the roles: owner and editor

INSERT INTO whiteboard_collaborator_role(role_name)
VALUES ('owner');

INSERT INTO whiteboard_collaborator_role(role_name)
VALUES ('editor');


-- Populating the whiteboard

INSERT INTO whiteboard(whiteboard_title)
VALUES ('Memes 101 - The Origins');

INSERT INTO whiteboard(whiteboard_title)
VALUES ('Pictionary with the bros');