const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");
const connection = require('./db/connection');

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: '',
//     database: 'employee_db'
//   },
//   console.log(`Connected to the Employee Tracker.`));


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
            updateRole();
            break;
        default:
            process.end(0)
    }
})
};

// View all roles
function viewAllRoles() {
    connection.query("select * from role", function(error, data) {
        error ? error : console.table(data), connection.end();
    });
}

// View employees
function viewEmployees(){
    connection.query("select * from employee",function(error,data) {
        error ? error : console.table(data), connection.end();
    });
}

// View departments
function viewDepartments(){
    connection.query("select * from department",function(error,data) {
      
    error ? error : console.table(data), connection.end();
    });
}

// Add a department   
function addDepartment() {
    inquirer.prompt({
        type:"input",
        name:"department",
        message:"Enter the name of the department."
    })

    .then (function(answers) {
    connection.query("insert into department (dep_name) values " + {dep_name:answers.department},function(error,data) {
        error ? error : console.table(data), connection.end(); 
        })
    })
};
const addRole = () => {
	let sqlQuery = 'SELECT * FROM department';
	connection.query(sqlQuery, function (error, results) {
		let departments = [];
		if (error) throw error;
		departments = results.map(result => ({
			id: result.id,
			name: result.dep_name,
		}));
        console.log(departments);
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please, insert a role title',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please, insert a salary for this role',
            },
            {
                type: 'list',
                name: 'id',
                message: 'Which department this role belongs to?',
                choices: departments.map(dep => ({
                    name: dep.name,
                    value: dep.id,
                })),
            },
        ])
        .then(response => {
            let sqlQuery = 'INSERT INTO role SET ?';
            let newRole = {
                title: response.title,
                salary: response.salary,
                dep_id: response.id,
            };
            connection.query(sqlQuery, newRole, function (error, results) {
                if (error) throw error;
                console.log('Role has been added');
                connection.end();
            });
        });
});
};

    const addEmployee = () => {
        let sqlQuery = 'SELECT * FROM role';
        connection.query(sqlQuery, function (error, results) {
            let roles = [];
            if (error) throw error;
            roles = results.map(result => ({
                id: result.id,
                name: result.role_id
            }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            let employees = [];
            if (error) throw error;
            employees = results.map(result => ({
                id: result.id,
                name: result.first_name + "" + result.last_name,
            }));
            inquirer
            .prompt([
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
.then(response => {
    let sqlQuery = 'INSERT INTO employee SET ?';
    let newEmployee = {
        first_name: response.firstName,
        last_name: response.lastName,
        role_id: response.roleId,
        manager_id: response.managerId,
    };
    connection.query(sqlQuery, newEmployee, function (error, results) {
        if (error) throw error;
        console.log('Employee has been added');
        connection.end();
    });
});
});
});
    };


// .then(function (answers) {
//     connection.query("insert into employee (first_name, last_name, role_id, manager_id) values " + {firstName:answers.firstName, lastName:answers.lastName, roleId:answers.roleId, managerId:answers.managerId}, function(error,data) {
//         error ? error : console.table(data), connection.end();    
//     })
// })
// };   

// Update employee and their role
// function updateRole() {
//     let sqlQuery = 'SELECT * FROM role';
//     connection.query(sqlQuery, function (error, results) {
//         let roles = [];
//         if (error) throw error;
//         roles = results.map(result => ({
//             id: result.id,
//             name: result.role_id
//         })); 
//         connection.query(`SELECT * FROM employee;`, (err, res) => {
//             let employees = [];
//             if (error) throw error;
//             employees = results.map(result => ({
//                 id: result.id,
//                 name: result.first_name + "" + result.last_name,
//             }));
//     inquirer.prompt([
//         {
//         type:"input",
//         name:"empUpdate",
//         message:"Select employee to update."
//         },
//         {
//         type:"input",
//         name:"roleUpdate",
//         message:"Select the new role for the employee."     
//         }
//     ])
//     .then(response => {
//         let sqlQuery = 'UPDATE employee SET role_id = ?';
//         let updateEmployee = {
//             empUpdate: response.empUpdate,
//             roleUpdate: response.roleUpdate,
//         };
//         connection.query(sqlQuery, updateEmployee, function (error, results) {
//             if (error) throw error;
//             console.log('Employee updated');
//             connection.end();
//         });
//     });
// });
// });
// };
        

function updateRole() {
    connection.query('SELECT * FROM employee', function (err, result) {
      if (err) throw (err);
      inquirer.prompt([
          {
            name: "employeeName",
            type: "list",
    
            message: "Select employee to update role",
            choices: function () {
              var employeeArray = [];
              result.forEach(result => {
                employeeArray.push(
                  result.last_name
                );
              })
              return employeeArray;
            }
          }
        ])
     
        .then(function (results) {
          console.log(results);
          const name = results.employeeName;
        
          connection.query("SELECT * FROM role", function (err, res) {
            inquirer.prompt([
                {
                  name: "role",
                  type: "list",
                  message: "What is their new role?",
                  choices: function () {
                    var roleArray = [];
                    res.forEach(res => {
                      roleArray.push(
                        res.title)
                    })
                    return roleArray;
                  }
                }
              ]).then(function (newRole) {
                const role = newRole.role;
                connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                  if (err) throw (err);
                  let roleId = res[0].id;
     
                  let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                  let values = [parseInt(roleId), name]
          
                  connection.query(query, values,
                    function (err, res, fields) {
                      console.log(`You have updated ${name}'s role to ${role}.`)
                    })
                })
              })
          })
        })
    })
    };

menuOptions();
