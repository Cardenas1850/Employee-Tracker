INSERT INTO departments (name) 
VALUES  ("Kitchen Staff"),
        ("Front of House"),
        ("Marketing"),
        ("Owner");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Head Chef", 75000.00, 1),
        ("Sous Chef", 68000.00, 1),
        ("Supa Chef", 60000.00, 1),
        ("Dishwasher", 45000.00,1),
        ("Server", 55000.00, 2),
        ("Hostess/Host", 50000.00, 2),
        ("Head of Marketing and Sales", 80000.00, 3),
        ("Owner and Operator", 150000.00, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("Jason", "Cardenas", 1), 
        ("Bruce", "Sigsbee", 2),
        ("Peyton", "Green", 3),
        ("Andy", "Cahue", 4),
        ("Carlos", "Cahue", 5),
        ("Alexis", "Cardenas", 6),
        ("Micah", "Germann", 7),
        ("Darius", "Perry", 8);