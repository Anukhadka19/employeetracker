use employee_db;

insert into department (`dep_name`)
values ('engineering'), ('mechanics'), ('hr');

insert into role (title, salary, dep_id)
values 
('engineering manager', 50000, 1), 
('engineering intern', 30000, 1),
('hr manager', 40000, 3);

insert into employee (first_name, last_name, role_id, manager_id)
values 
('John', 'Smith', 1, NULL), 
('Jane', 'Roe', 2, 1),
('Keri', 'Ross', 3, NULL);