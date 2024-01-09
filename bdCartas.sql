CREATE DATABASE `db_cards` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE db_cards;
-- Crear tabla  --

CREATE TABLE suits(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(10) NOT NULL);
    
CREATE TABLE cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_suit INT(10) NOT NULL,
    number INT(10) NOT NULL
);

-- Insertar cartas numeradas

INSERT INTO suits(id, description) values
	(1, "oros"),
	(2, "espadas"),
	(3, "copas"),
	(4, "bastos");


INSERT INTO cards (id, id_suit, number) VALUES
(1, '1', '1'),
(2, '1', '2'),
(3, '1', '3'),
(4, '1', '4'),
(5, '1', '5'),
(6, '1', '6'),
(7, '1', '7'),
(8, '1', '8'),
(9, '1', '9'),
(10, '1', '10'),
(11, '1', '11'),
(12, '1', '12'),
(13, '2', '1'),
(14, '2', '2'),
(15, '2', '3'),
(16, '2', '4'),
(17, '2', '5'),
(18, '2', '6'),
(19, '2', '7'),
(20, '2', '8'),
(21, '2', '9'),
(22, '2', '10'),
(23, '2', '11'),
(24, '2', '12'),
(25, '3', '1'),
(26, '3', '2'),
(27, '3', '3'),
(28, '3', '4'),
(29, '3', '5'),
(30, '3', '6'),
(31, '3', '7'),
(32, '3', '8'),
(33, '3', '9'),
(34, '3', '10'),
(35, '3', '11'),
(36, '3', '12'),
(37, '4', '1'),
(38, '4', '2'),
(39, '4', '3'),
(40, '4', '4'),
(41, '4', '5'),
(42, '4', '6'),
(43, '4', '7'),
(44, '4', '8'),
(45, '4', '9'),
(46, '4', '10'),
(47, '4', '11'),
(48, '4', '12');

-- Mostrar la tabla
SELECT * FROM cards;
