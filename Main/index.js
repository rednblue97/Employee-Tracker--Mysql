//Packages needed for application
const mysql = require('mysql2');
const inquirer = require('inquirer');
require ('console.table');

//Starts the port
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connects to the database we created 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        // User password for mysql goes below
        password:'',
        database:'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
)

//Succesful connection, error if otherwise
db.connect(err => {
    if(err) throw err;
    console.log("DB connected!")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    startApp();
    })
})

//Starts the inquirer,menu to select 
function startApp() {
    inquirer
    .prompt(
        [{
            type:"list",
            name:"departmentList",
            message:"Let's begin",
            choices:[
                "View All Employees",
                "Add Employees",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department"
            ],
        }
    ])
    //If the user selects any one of these then they will be directed
    .then(response => {
        let options = response.departmentList;
        if (options === "View All Employees") {
            viewAllEmployees();
        };
        if (options === "Add Employees") {
            addEmployees();
        }
        if (options === "Update Employee Role") {
            updatedEmployeeRole();
        }
        if (options === "View All Roles") {
            viewAllRoles();
        }
        if (options === "Add Role") {
            addRole();
        }
        if (options === "View All Departments") {
            viewAllDepartments();
        }
        if (options === "Add Department") {
            addDepartment();
        } 
    })   
}
    // prompts for adding a new employee
    let addEmployees = () => {
        return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please enter the employee's first name below."
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter the employee's last name below."
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter the employee's salary below."
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter the employee role ID below."
            },
            {
                type:"input",
                name: "manager_id",
                message: "Please enter the manager Id for employee below."
            },
        ])
        // Inserts the new information into the employee table, returns to the main menu
        .then(function(responses) {
            db.query("INSERT INTO employee SET ?",
            { first_name: responses.first_name, last_name: responses.last_name, salary: responses.salary, role_id: responses.role_id, manager_id: responses.manager_id},
            function(err) {
                if (err) throw err;
                startApp();
            })
        })
    }
    // Prompts for updating a current employee
    let updatedEmployeeRole = () => {
        return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please enter the employee's first name below.",
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter the employee's last name below."
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter the new role ID for the employee below."   
            },
        ])
        // Inserts the role id and updates the first and last name
        .then(function(responses) {
            db.query('UPDATE employee SET ?',
            { first_name: responses.first_name, last_name:responses.last_name, role_id: responses.role_id},
            function(err) {
                if (err) throw err;
                startApp();
            }
            )
        })
    }
    // Grabs the employee table from the database and displays it
    let viewAllEmployees = () => {
        db.query(`SELECT * FROM employee`, (err,rows) => {
            if (err)throw err
            console.table(rows)
            startApp();
        })
}
    // Grabs the department table from the database and displays it
    let viewAllDepartments = () => {
        db.query(`SELECT * FROM department`, (err,rows) => {
            if (err)throw err
            console.table(rows)
            startApp();
        })
}
    // Grabs the role table from the database and displays it
    let viewAllRoles = () => {
        db.query(`SELECT * FROM role`, (err,rows) => {
            if (err)throw err
            console.table(rows)
            startApp();
        })
}
    // Prompts to add a new department
    let addDepartment = () => {
        return inquirer
        .prompt([
            {
                type: "input",
                name:"id",
                message: "Enter Id below."
            },
            {
                type: "input",
                name: "name",
                message:"Please enter the new department below."
            }
        ])
        // Inserts the new department into the department table
        .then(function(responses) {
            db.query(
                "INSERT INTO department SET ?",
                { id: responses.id, name: responses.name},
                function(err) {
                    if (err) throw err;
                    startApp();   
                })
            }) 
}
    // Prompts to create a new role
    let addRole = () => {
        return inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Please enter role name.",
            },
            {
                type: "input",
                name: "salary",
                message: "PLease enter salary below.",
            },
            {
                type: "input",
                name: "department_id",
                message: "Please enter ID below."
            }
        ])
        // Gets the new information, adds it into the role table
        .then(function(responses) {
            db.query(
                "INSERT INTO role SET ?",
                { title: responses.title, salary: responses.salary, department_id: responses.department_id},
                function(err) {
                    if (err) throw err;
                    startApp();
                }
            )
        })
    }
