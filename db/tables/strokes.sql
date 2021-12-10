CREATE TABLE IF NOT EXISTS strokes (
    stroke_id serial,
    whiteboard_id uuid,
    user_id int,
    draw_time timestamp(0),
    data_string varchar(2500),
    brush_shape varchar(10),
    brush_colour varchar(10),
    brush_size int,
    PRIMARY KEY (stroke_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS undo_redo (
    stroke_id serial,
    user_id int,
    FOREIGN KEY (stroke_id) REFERENCES strokes(stroke_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
