// functions that dictate the user's traversal through the inquirer tree
// dependencies
const {introPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt} = require("./prompts");
const {populateDepartments, populateRoles, populateEmployees} = require("./prompts");
const {db_addDepartment, db_addRole, db_addEmployee, db_updateEmployee} = require("../util/queries");
const table = require("console.table");

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
            // call add department function
            break;
        case "Add a role":
            // call add role function
            break;
        case "Add an employee":
            // call add employee function
            break;
        case "Update an employee's role":
            // call update employee function
            break;
        default:
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

// exports
module.exports = {presentChoices};