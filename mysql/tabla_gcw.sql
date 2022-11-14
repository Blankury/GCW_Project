create database if not exists JumpNSurvive;
use JumpNSurvive;

CREATE TABLE usuarios (
  idUser int not null auto_increment primary KEY,
  nombre varchar(100) not null,
  fecha TIMESTAMP not null default NOW(),
  puntuacion int not null,
  nivel varchar(40) not null
);

SELECT * FROM usuarios;
    