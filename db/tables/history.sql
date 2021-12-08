--Create tables to store session history

CREATE TABLE IF NOT EXISTS snapshots (
    image_id serial,
    image_time timestamp(0),
    image_data bytea,
    PRIMARY KEY (image_id)
);

CREATE TABLE IF NOT EXISTS session_history (
    log_id serial,
    whiteboard_id uuid,
    image_id int,
    PRIMARY KEY (log_id),
    FOREIGN KEY (image_id) REFERENCES snapshots(image_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id) ON DELETE CASCADE
);

