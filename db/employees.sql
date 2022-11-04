CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE departments(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
   name varchar(30) UNIQUE NOT NULL
);

CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL
    title varchar(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    departmentId INT UNSIGNED NOT NULL,
    FOREIGN KEY ( departmentId) REFERENCES departments
);

CREATE TABLE employees(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL
    firstName varchar (30) NOT NULL,
    lastName varchar(30) NOT NULL,
    roleId INT UNSIGNED NOT NULL ,
    managerID INT UNSIGNED,
    FOREIGN KEY (roleId) REFERENCES roles(id),
    FOREIGN KEY (managerID) REFERENCES employees (id)
);

USE employees_db;
INSERT INTO departments
(name) 

VALUES 
('sales')
('engineering')
('finance')
('legal')
INSERT INTO roles
(title, salary, departmentId)

VALUES
('sales leads', 1000, 1)
('')
('')
('')
('')
('')
('')
('')