INSERT INTO department(name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title,salary,department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Lead Engineer", 150000, 2),
        ("Accountant", 90000, 3),
        ("Lawyer", 160000, 4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  ("Kobe","Bryant",1, NULL),
        ("LeBron","James",2,1),
        ("Steve","Jobs",3,2),
        ("Magic","Johnson",4,3);    
