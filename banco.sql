CREATE DATABASE gatitos;

USE gatitos;

CREATE TABLE gato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    imagem_url VARCHAR(255) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL
);

--SHOW TABLES;
--DESCRIBE TABLE nome_da_tabela;