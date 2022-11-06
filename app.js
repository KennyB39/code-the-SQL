const mysql2 = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = require('../db/Connection.js')
const Connection = require('../code-the-SQL/db/connections')

start()
function start() {
    inquirer.Prompt([
        {
            name: 'action',
            type: 'list',
            message: 'choose an option.',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add new department',
                'add a new role',
                'add new employee',
                'remove a department',
                'remove a role',
                'remove an employee',
                'update employee roles',
                'exit'
            ]
        }])

        .then(function (answer) {
            switch (answer.action) {
                case 'view all departments':
                    viewDepartments();
                    break;

                case 'view all roles':
                    viewRoles;
                    break;

                case 'view all emplooyees':
                    viewEmployees;
                    break;

                case 'add new department':
                    addDepartment;
                    break;

                case 'add new role':
                    createNewRole;
                    break;

                case 'add a new employee':
                    addEmployee;
                    break;

                case 'remove a department':
                    removeDepartment;
                    break;

                case 'remove a role':
                    removeRole;
                    break;

                case 'remove an employee':
                    removeEmployee;
                    break;

                case 'update employee roles':
                    updateRole;
                    break;

                case 'exit':
                    Connection.end();
                    break;
            }
        });
};

function viewDepartments() {
    db.query('SELECT*FROM departments', function (err, res) {
        if (err) throw err;
        console.log(res)
        start()
    })
}

function viewRoles() {
    db.query('SELECT*FROM roles', function (err, res) {
        if (err) throw err;
        console.log(res)
        start()
    })
}

function viewEmployees() {
    db.query('SELECT*FROM employees', function (err, res) {
        if (err) throw err;
        console.log(res)
        start()
    })
}

function addDepartment() {
    inquirer.Prompt([
        {
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add??'
        }
    ]).then(function (answer) {
        db.query('INSERT INTO departments SET', {
            name: answer.addDepartment
        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    })
}

const createNewRole = () => {
    db.query('SELECT* FROM departments', (err, addDepartment) => {
        if (err) { console.log(err) }
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Name of the role you would like to add:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Salary for role:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Department ID:',
                choices: viewDepartments.maps(addDepartment => ({
                    name: `${departments.name}`,
                    value: department.id
                }))
            }
        ]).then(function (answers) {
            db.query('INSERT INTO roles SET',
                {
                    title: answers.title,
                    salary: answers.salary,
                    departmentId: answers.departmentId
                }, function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    start()
                })
        })
    })
}

const addEmployee = () => {
    db.query('SELECT* FROM viewRoles', (err, viewRoles) => {
        if (err) { console.log(err) }
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'First Name:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Last Name:'
            },
            {
                type: 'list',
                name: 'roleId',
                message: roles.map(role => ({
                    name: `${role.title}`,
                    value: role.id
                }))
            }
        ]).then(function (answers) {
            db.query('INSERT INTO employees SET', {
                firstName: answers.firstName,
                lastName: answers.lastName,
                roleId: answers.roleId,
                managerId: null
            }, function (err, res) {
                if(err) throw err;
                console.table(res)
                start()
            })
            
        })
    })
}
