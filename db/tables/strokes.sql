CREATE TABLE IF NOT EXISTS strokes (
    stroke_id serial,
    whiteboard_id varchar(100),
    user_id int,
    draw_time timestamp(3),
    data_string varchar(1000),
    brush_shape varchar(10),
    brush_colour varchar(10),
    brush_size int,
    PRIMARY KEY (stroke_id),
    --FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id), add this back once whiteboard db is implemented
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
