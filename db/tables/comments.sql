

CREATE TABLE IF NOT EXISTS comments (
    comment_id serial, -- PRIMARY KEY
    whiteboard_id int, -- FOREIGN KEY
    comment_location varchar(20),
    message_text varchar(200),
    user_id int,
    parent_comment_id int, 
    time_stamp varchar(100)


    PRIMARY KEY (comment_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id)

  );

-- INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp)
-- VALUES ('1', '20,25', 'Message example', '10', '1', '2021-11-26 00:00:01');

-- INSERT INTO comments(omment_location, message_text,timestamp)
-- VALUES ('1', '20,25', 'Message example', '10', '1', '2021-11-26 00:00:01');