// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'*ZJSME!*8x-Xh$',
        database:'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
)

db.connect(err => {
    if(err) throw err;
    console.log("DB connected!")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    startApp();
    })
})


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

function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err,rows) => {
        if (err)throw err
        console.table(rows)
        startApp();
    })
}
    function viewAllDepartments() {
        db.query(`SELECT * FROM department`, (err,rows) => {
            if (err)throw err
            console.table(rows)
            startApp();
        })
    
}



