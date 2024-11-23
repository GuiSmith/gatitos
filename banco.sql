CREATE DATABASE gatitos;

USE gatitos;

CREATE TABLE gato (
    id VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(100) DEFAULT '',
    url VARCHAR(255) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP
);

--SHOW TABLES;
--DESCRIBE TABLE nome_da_tabela;