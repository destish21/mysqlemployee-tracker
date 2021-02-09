USE employees;
INSERT INTO
  department (name) 
  VALUE 
  ("Marketing"),
  ("Finance"),
  ("Management"),
  ("Human Resource"),
  ("IT");
INSERT INTO
  role (title, salary, department_id) 
  VALUE 
  ("Lead Engineer", 160000, 5),
  ("Technical Program Manager", 160000, 3),
  ("Software Engineer", 130000, 5),
  ("Account manager", 130000, 2),
  ("Accountant", 12000, 2),
  ("Senior Software Engineer", 1900000, 5),
  ("Salesperson", 90000, 1),
  ("Manager", 130000, 3),
  ("Recruiter", 200000, 4);
  
INSERT INTO
employeeT (first_name, last_name, manager_id, role_id) 
VALUE 
("Elaine", "Anderson", null,  1),
("Jerry", "William", null,  2),
("John", "Richard", null,  3),
("Michael", "Jordan", 1, 4),
("Sarah", "Donald", 4, 5),
("Andries", "Baker", 1, 6),
("Kramer", "Mark", 2, 7),
("Larry", "Dariwine",3 , 8),
("George", "Washington", 5, 9);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employeeT;

-- SELECT * FROM emploeeT.manager

-- SELECT e.*, CONCAT( m.first_name, '' , m.last_name) AS manager FROM employee AS e 
-- LEFT JOIN emploee AS m ON e.manager_id;
-- SELECT department.id, department.name FROM department ORDER BY department.id;
-- SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
--     FROM employee
--     LEFT JOIN role ON (role.id = employee.role_id)
--     LEFT JOIN department ON (department.id = role.department_id)
--     ORDER BY department.name;
