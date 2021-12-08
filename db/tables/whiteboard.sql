CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE whiteboard_collaborator_role AS ENUM('owner', 'editor');

CREATE TABLE IF NOT EXISTS whiteboard (
    -- Generates UUID values based on the combination of computer's MAC address, current timestamp and a random value
    -- https://www.postgresqltutorial.com/postgresql-uuid/#:~:text=Introduction%20to%20PostgreSQL%20UUID%20type,universe%20using%20the%20same%20algorithm
    whiteboard_id uuid DEFAULT uuid_generate_v1(),
    whiteboard_title varchar(100) DEFAULT 'Untitled CollaBoard',
    PRIMARY KEY (whiteboard_id)
);

CREATE TABLE IF NOT EXISTS whiteboard_collaborator (
    whiteboard_id uuid,
    user_id int,
    user_role whiteboard_collaborator_role,
    PRIMARY KEY (whiteboard_id, user_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Creating a sample whiteboard

INSERT INTO whiteboard(whiteboard_id, whiteboard_title)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', 'Memes 101 - The Origins');

INSERT INTO whiteboard_collaborator(whiteboard_id, user_id, user_role)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', 1, 'owner');

INSERT INTO whiteboard_collaborator(whiteboard_id, user_id, user_role)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', 2, 'editor');