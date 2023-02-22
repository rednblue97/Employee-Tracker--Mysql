-- Insert values that will later be used when making new departments,roles, and employees
INSERT INTO department(name,id)
VALUES  ("Sales",25),
        ("Engineering",30),
        ("Finance",97),
        ("Legal",01);

INSERT INTO role (title,salary,department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Lead Engineer", 150000, 2),
        ("Accountant", 90000, 3),
        ("Lawyer", 160000, 4);

INSERT INTO employee (first_name,last_name,salary,role_id,manager_id)
VALUES  ("Kobe","Bryant",70000,1, NULL),
        ("LeBron","James",80000,2,1),
        ("Steve","Jobs",90000,3,2),
        ("Magic","Johnson",100000,4,3);    
