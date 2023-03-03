const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");
const connection = require('./db/connection');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the Employee Tracker.`));


function menuOptions() {
    inquirer.prompt([
        {
        type:"list",
        name:"option",
        message:"Select menu options",
        choices: [
            "View All Roles",
            "View Employees",
            "View Departments",
            "Add Role",
            "Add Employee",
            "Add Department",
            "Update Employee Role"
            ]
        }
    ])  

.then(function(selection) {
    switch(selection.option){
        case "View All Roles":
            viewAllRoles();
            break;
        case "View Employees":
            viewEmployees();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        default:
            db.end()
            process.end(0)
    }
})
};

// View all roles
function viewAllRoles() {
    connection.query("select * from role", function(error, data) {
        console.log(error, data);
    });
}

// View employees
function viewEmployees(){
    connection.query("select * from employee",function(error,data) {
        console.table(error, data);
    });
}

// View departments
function viewDepartments(){
    connection.query("select * from department",function(error,data) {
        console.table(error, data);
    });
}

// Add a department   
function addDepartment() {
    inquirer.prompt({
        type:"input",
        name:"department",
        message:"Enter the name of the department."
    })
}
    .then (function(response) {
    connection.query("insert into department (dep_name) values" (`${answers.department}`),function(error,data) {
        console.table(error, data);    
        })
    })

// Add a role
function addRole() {
    inquirer.prompt([
        {
        type:"input",
        name:"role",
        message:"Enter the name of the role."
        },
        {
        type:"input",
        name:"salary",
        message:"Enter the salary for the role."
        },
        {
        type:"input",
        name:"department",
        message:"Enter the department id."
        }
    ])
}
.then(function (answers) {
    connection.query("insert into role (title, salary, dep_id) values" (`${answers.role}, ${answers.salary}, ${answers.department}`), function(error,data) {
        console.table(error, data);    
        })
    })

// Add an employee
function addEmployee() {
    inquirer.prompt([
        {
        type:"input",
        name:"firstName",
        message:"Enter employee's first name."
        },
        {
        type:"input",
        name:"lastName",
        message:"Enter employee's last name."
        },
        {
        type:"input",
        name:"roleId",
        message:"Enter employee role id."
        },
        {
        type:"input",
        name:"managerId",
        message:"Enter manager's information."    
        }
    ])
}
.then(function (answers) {
    connection.query("insert into employee (first_name, last_name, role_id, manager_id) values" (`${answers.firstName}, ${answers.lastName}, ${answers.roleId}, ${answers.managerId}`), function(error,data) {
    console.table(error, data);    
    })
})   

// Update employee and their role
function updateEmployee() {
    inquirer.prompt([
        {
        type:"input",
        name:"empUpdate",
        message:"Select employee to update."
        },
        {
        type:"input",
        name:"roleUpdate",
        message:"Select the new role for the employee."     
        }
    ])
}
.then(function (answers) {
    connection.query("update employees set role_id"(`${answers.empUpdate}, ${answers.roleUpdate}`), function(error,data) {
        console.table(error, data);    
    })  
});

init();

