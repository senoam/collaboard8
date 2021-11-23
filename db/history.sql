--Create tables to store session history

CREATE TABLE IF NOT EXISTS session_history (
    log_id serial,
    whiteboard_id serial,
    image_id serial,
    PRIMARY KEY (log_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id),
    FOREIGN KEY (image_id) REFERENCES snapshots(image_id)
);

CREATE TABLE IF NOT EXISTS snapshots (
    image_id serial,
    image_time timestamp(3),
    PRIMARY KEY (image_id)
);