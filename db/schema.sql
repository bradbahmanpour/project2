CREATE DATABASE dive_db
USE DATABASE dive_db


CREATE TABLE top_spots(
	id INT NOT NULL AUTO_INCREMENT,
	spot varchar(255) NOT NULL,
	images varchar(500) NOT NULL,
	body varchar(1000) NOT NULL,
	PRIMARY KEY (id)
);