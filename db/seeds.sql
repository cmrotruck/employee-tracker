INSERT INTO
    department (name)
VALUES
    ('Maintenance'),
    ('Customer Service'),
    ('Parts'),
    ('Sales'),
    ('Service');

INSERT INTO
    employee_role (title, salary, department_id)
VALUES
    ('Maintenance Tech', 45000.00, 1),
    ('Customer Service Rep', 25000.00, 2),
    ('Parts Rep', 35000.00, 3),
    ('Sales Person', 55000.00, 4),
    ('Mechanic', 50000.00, 5),
    ('Service Advisor', 50000.00, 5);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, NULL),
    ('Virginia', 'Woolf', 1, NULL),
    ('Piers', 'Gaveston', 1, 2),
    ('Charles', 'LeRoi', 2, 1),
    ('Katherine', 'Mansfield', 2, 1),
    ('Dora', 'Carrington', 3, 2),
    ('Edward', 'Bellamy', 5, 2),
    ('Montague', 'Summers', 3, 1),
    ('Octavia', 'Butler', 3, 1),
    ('Unica', 'Zurn', 4, 1);



