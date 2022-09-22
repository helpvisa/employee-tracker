// functions that dictate the user's traversal through the inquirer tree
// dependencies
const {introPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt} = require("./prompts");
const {populateDepartments, populateRoles, populateEmployees} = require("./prompts");
const {db_addDepartment, db_addRole, db_addEmployee, db_updateEmployee} = require("../util/queries");
const table = require("console.table");
const db = require("../util/connection");

// introduction screen w switch statement
async function presentChoices() {
    const choice = await introPrompt();
    // switch case for choice
    switch (choice.options) {
        case "View all departments":
            displayDepartments();
            break;
        case "View all roles":
            displayRoles();
            break;
        case "View all employees":
            displayEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee's role":
            updateEmployee();
            break;
        default:
            db.end();
            console.log("Take care!");
            break;
    }
}

// display departments and loop
async function displayDepartments() {
    const departments = await populateDepartments();
    console.log(departments); // replace with console.table
    // loop
    presentChoices();
}

// display roles and loop
async function displayRoles() {
    const roles = await populateRoles();
    console.log(roles); // replace with console.table
    // loop
    presentChoices();
}

// display employees and loop
async function displayEmployees() {
    const employees = await populateEmployees(false);
    console.log(employees); // replace with console.table
    // loop
    presentChoices();
}

// add a department and loop
async function addDepartment() {
    const dept = await addDepartmentPrompt();

    // add to database
    let result = await db_addDepartment(dept.name);
    if (result) {
        console.log("Department added to database!");
    } else {
        console.log("Error; department not added.");
    }

    // loop
    presentChoices();
}

// add a role and loop
async function addRole() {
    const role = await addRolePrompt();

    // add to database
    let result = await db_addRole(role.title, role.salary, role.department.id);
    if (result) {
        console.log("Role added to database!");
    } else {
        console.log("Error; role not added.");
    }

    // loop
    presentChoices();
}

async function addEmployee() {
    const employee = await addEmployeePrompt();

    // add to database
    let result = await db_addEmployee(employee.firstName, employee.lastName, employee.role.id, employee.manager.id);
    if (result) {
        console.log("Employee added to database!");
    } else {
        console.log("Error; employee not added.");
    }

    // loop
    presentChoices();
}

async function updateEmployee() {
    const employee = await updateEmployeePrompt();

    // update in database
    let result = await db_updateEmployee(employee.role.id, employee.employee.id);
    if (result) {
        console.log("Employee updated!");
    } else {
        console.log("Error; employee not updated.");
    }

    // loop
    presentChoices();
}

// exports
module.exports = {presentChoices}; // should be all I need for index