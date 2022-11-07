const mysql2 = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = require('./db/connections')
const Connection = require('../code-the-SQL/db/connections')



function start() {
    inquirer.prompt([
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
                    name: `${addDepartment.name}`,
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
                message: 'Role id:',
                choices: roles.map(role => ({
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
                if (err) throw err;
                console.table(res)
                start()
            })

        })
    })
}
const removeDepartment = () => {
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) { console.log(err) }
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeDepartment',
                message: 'Select which department you want to remove',
                choices: departments.map(departments => ({
                    name: `${departments.Name}`,
                    value: departments.id
                }))
            }
        ]).then(function (answer) {
            db.query(`DELETE FROM departments WHERE id = ${answer.removeDepartment}`,
                function (err, res) {
                    if (err) throw err
                    console.log('Department Removed')
                    start()
                })
        })
    })
}


function removeRole() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) { console.log(err) }

        inquirer.prompt([
            {
                type: 'list',
                name: 'removeRole',
                message: 'Select which role you would like to remove:',
                choices: roles.map(role => ({
                    name: `${role.title}`,
                    value: role.id
                }))
            }
        ]).then(function (answer) {
            db.query(`DELETE / FROM roles WHERE id = ${answer.removeRole}`,
                function (err, res) {
                    if (err) throw err
                    console.log('Role removed.')
                    start()
                })
        })
    })
}
function removeEmployee() {
    db.query('SELECT * FROM employee employeess', (err, employee) => {
        if (err) { conmsole.lopg(err) }
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeEmployee',
                message: 'Which employee would ;like to remove',
                choices: viewEmployees.map(employee => ({
                    name: `${employee.firstName} ${employee.lastName}`,
                    value: employee.id
                }))
            }
        ]).then(function (answer) {
            db.query(`DELETE * FROM employees WHERE id = ${answer.removeEmployee}`,
                function (err, res) {
                    if (err) throw err
                    console.log('Employee removed')
                    start()
                })
        })
    })
}
function updateRole() {
    db.query('SELECT * FROM employees', (err, employee) => {
        if (err) { console.log(err) }
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectEmp',
                message: 'which employees role will be updated?',
                choices: viewEmployees.map(employee => ({
                    name: `${employee.firstName} ${employee.lastName}  role ID: ${employee.roleId}`,
                    value: employee.id
                }))
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'New role ID:',
                choices: roles.map(role => ({
                    name: `${role.title}`,
                    value: role.id
                }))
            }
        ]).then(function (answers) {
            db.query('UPDATE employees SET ? WHERE ?', [{ roleId: answers.updateRole }, { id: answers.selectEmployee }], function (err, res) {
                if (err) throw err
                console.log('Employee role updated')
                start()
            })
        })
    })
}
start()