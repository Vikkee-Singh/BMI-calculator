

CREATE DATABASE bmiCalculator;

CREATE TABLE personbmi (
    ID int NOT NULL AUTO_INCREMENT,
    gender varchar(50),
    heightCm int,
    weightKg int,
    bmiCategory varchar(255),
    healthRisk varchar(255),
    bmi DOUBLE,
    PRIMARY KEY (ID)
);
