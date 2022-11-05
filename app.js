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
                'update employee rolls',
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

            }

        })
}