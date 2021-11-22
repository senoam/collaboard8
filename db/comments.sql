

CREATE TABLE IF NOT EXISTS comments (
    comment_id serial, -- PRIMARY KEY
    whiteboard_id int, -- FOREIGN KEY
    comment_location varchar(20),
    message_text varchar(200),
    user_id int,
    parent_comment varchar(200), -- Is this suppossed to be parent comment's id??
    timestamp varchar(50)


    PRIMARY KEY (comment_id)
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id),

  );