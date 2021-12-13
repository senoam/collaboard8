CREATE TABLE IF NOT EXISTS comments (
    comment_id serial, -- PRIMARY KEY
    whiteboard_id uuid, -- FOREIGN KEY
    comment_location varchar(20),
    message_text varchar(200),
    user_id int,
    parent_comment_id int,
    time_stamp timestamp(0),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (whiteboard_id) REFERENCES whiteboard(whiteboard_id) ON DELETE CASCADE

  );

INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', '200,250', 'What a cool whiteboard', '1', '0', '2021-11-26 00:00:01');

INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', '100,150', 'Nice drawing :-)', '2', '0', '2021-11-26 00:00:01');

INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp)
VALUES ('4db898e8-556c-11ec-beb4-0242ac130002', '100,150', 'Good point John!', '2', '1', '2021-11-26 00:00:01');
