USE timer_database;

INSERT INTO users (name, email, password, type) VALUES 
("testuser", "test@test.test", "$2a$10$H2dUN/cXg6.3hZMF2EYfAe0sXebAoWgAXCtN0K00EkljGP6hIhj9K", "basic");

INSERT INTO work_genres (name, user_id, is_default) VALUES
("テスト1", null, 1),
("テスト2", null, 1),
("テスト3", 1, 0);

INSERT INTO work_names (name, genre_id, user_id) VALUES
("テスト1", 1, 1),
("テスト2", 1, 1),
("テスト3", 2, 1);

INSERT INTO timer_records (user_id, work_name_id, duration) VALUES
(1, 1, 50),
(1, 2, 150),
(1, 3, 1500);