CREATE TABLE IF NOT EXISTS strokes (
    stroke_id serial,
    whiteboard_id int,
    user_id int,
    stroke_time timestamp(0),
    stroke_string varchar(1000),
    stroke_shape varchar(10),
    stroke_colour varchar(10),
    stroke_size int,
    PRIMARY KEY (stroke_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
