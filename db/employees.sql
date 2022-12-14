DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE departments(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
   name varchar(30) UNIQUE NOT NULL
);

CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title varchar(30) NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    departmentId INT UNSIGNED NOT NULL,
    FOREIGN KEY ( departmentId) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
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
('sales'),
('engineering'),
('finance'),
('legal');
INSERT INTO roles
(title, salary, departmentId)

VALUES
('sales leads', 150000, 1),
('sales person', 80000, 1),
('lead engineer', 100000, 2),
('software engineer', 120000, 2),
('account manager', 160000, 3),
('accontant', 125000, 3),
('legal team lead', 200000, 4),
('lawyer', 175000, 4);

INSERT INTO employees
    (firstName, lastName, roleId, managerID)
    VALUES 
('Manny','Hernandez',1, 1)
('Eddie', 'Guerrero', 1, 2)
('Sarah', 'Knittwhits', 2,1)
('Lee', 'Ericson', 2, 1)
('Wendy', 'Wu', 1,3)
('Jared', 'Melville', 3, 1)
('Harold', 'Melvin', 2,3)
('Edward', 'McMahon',2,2)
('Neveah', 'Kurtswin',3,4)