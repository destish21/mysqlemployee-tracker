DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employeeT (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
manager_id INT,
role_id INT

);
INSERT INTO department (name)
VALUE ("Marketing");

INSERT INTO department (name)
VALUE ("Finance");

INSERT INTO department (name)
VALUE ("Management");

INSERT INTO department (name)
VALUE ("Human Resource");

INSERT INTO department (name)
VALUE ("IT");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 160000, 5);

INSERT INTO role (title, salary, department_id)
VALUE ("Technical Program Manager", 160000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 130000, 5);

INSERT INTO role (title, salary, department_id)
VALUE ("Accountant manager", 130000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Senior Software Engineer", 1900000, 5);

INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 90000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Manager", 130000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Recruiter", 200000, 4);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("Jack", "Anderson", null, 1);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("Mary", "William", null, 2);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("John","Richard", null, 3);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("Denis", "Taylor", 1, 4);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Donald", 4, 5);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("Elizabeth", "Baker", 1, 6);

INSERT INTO employeeT (first_name, last_name, manager_id, role_id)
VALUE ("David", "Mark", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employeeT


