-- create database myapp;
-- use myapp;
-- create table users
-- (
-- id int auto_increment primary key,name varchar(100)not null
-- );

-- insert into users(name)values('Harry Potter');

-- select*from users

-- update users set name = 'cell' where id =8


-- 使用 myapp 数据库
USE myapp;

-- 创建 movies 表
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

-- 插入测试数据
INSERT INTO movies (title) VALUES ('Harry Potter and the Sorcerer\'s Stone');
INSERT INTO movies (title) VALUES ('The Lord of the Rings');
INSERT INTO movies (title) VALUES ('Inception');

-- 验证表内容
SELECT * FROM movies;




