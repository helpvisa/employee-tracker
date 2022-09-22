// dependencies
const db = require("../util/connection");
const inquirer = require('inquirer');

// regular expression definitions
const letterExpression = /[a-zA-Z]/;
const specialExpression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// attempt connection to database in order to populate prompts
db.connect(err => {
    // catch any possible connection errors
    if (err) throw err;
    // otherwise confirm connection
    console.log("Successfully connected to your team's database.");
});

// create functions which populate arrays of choices to be used from within the prompts
async function populateDepartments() {
    // construct query
    const sql = `SELECT name, id FROM department ORDER BY name`;

    // get info from database
    let departments = await db.promise().query(sql);

    // map these departments to new array (see populateEmployees for small explanation)
    departments = departments[0].map(department => {
        const obj = {
            name: department.name,
            value: {
                name: department.name,
                id: department.id
            }
        }
        return obj;
    });

    // return this new array
    return departments;
}

async function populateRoles() {
    // construct query
    const sql = `SELECT title, salary, department_id, id FROM role ORDER BY title`;

    // get info from database
    let roles = await db.promise().query(sql);

    // map these roles to a new array (see populateEmployees for small explanation)
    roles = roles[0].map(role => {
        const obj = {
            name: role.title,
            value: {
                title: role.title,
                salary: role.salary,
                department: role.department_id,
                id: role.id
            }
        }
        return obj;
    });

    // return this new array of object
    return roles;
}

async function populateEmployees(returnEmpty) { // return empty bool option; returns additional "No manager" entry for update prompt
    // construct query
    const sql = `SELECT first_name, last_name, role_id, manager_id, id FROM employees ORDER BY last_name`;

    // get info from database
    let employees = await db.promise().query(sql);

    // map to a new array (name = what is displayed in inquirer, value = values used for modifications in code)
    employees = employees[0].map(employee => {
        const obj = {
            name: employee.first_name + " " + employee.last_name,
            value: {
                firstName: employee.first_name,
                lastName: employee.last_name,
                role: employee.role_id,
                manager: employee.manager_id,
                id: employee.id
            }
        }
        return obj;
    });

    // do we want to populate a "NO MANAGER" column?
    if (returnEmpty) {
        employees.push({
            name: "NO MANAGER",
            value: {
                id: null // if id is null, no manager will be assigned in the database
            }
        });
    }

    // return this new array of objects
    return employees;
}

// define the prompts used by the main loop
// multi-purpose list of options shown to user on application start, can be reused
async function introPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please make a selection.",
            choices: ["View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role",
                "EXIT APPLICATION"] // capitalize to really *accentuate* that you're leaving and we'll miss you!
        }
    ]);
}

// shown when a department needs to be added
async function addDepartmentPrompt() {
    return await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter a name for the department you are adding: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name for the department.");
                    return false;
                }
            }
        }
    ]);
}

// shown when a role needs to be added
async function addRolePrompt() {
    // get array of departments
    const departments = await populateDepartments();

    // construct prompt
    return await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter a name for the role you are adding: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name for the role.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter a salary for this role: ",
            validate: salaryInput => {
                // "regular expression"; checks for letters in the input
                if (letterExpression.test(salaryInput) || specialExpression.test || salaryInput.length > 12) {
                    console.log("Please remove any letters or special characters from your input and ensure the salary is within 10 figures.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "Please select a department for this role.",
            choices: departments // fill this in with a database query
        }
    ]);
}

// shown when an employee needs to be added
async function addEmployeePrompt() {
    // populate employees array
    const employees = await populateEmployees(true);
    // populate roles array
    const roles = await populateRoles();
    // construct prompt
    return await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the employee's first name: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a first name.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the employee's last name: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a last name.");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's role from the list.",
            choices: roles // fill this in with database query
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee's manager from the list.",
            choices: employees // fill this in with database query, add "no manager" choice to array as well
        }
    ]);
}

// shown when an employee needs to be updated
// formatted as a function, so that the values can be updated dynamically
async function updateEmployeePrompt() {
    // populate employees array
    const employees = await populateEmployees(false);
    // populate roles array
    const roles = await populateRoles();
    // use this to construct prompt, and return the values for use later in a main() function
    return await inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please select an employee to update from the list.",
            choices: employees // fill this in with database query
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's new role from the list.",
            choices: roles // fill this in with database query
        }
    ]);
}

// export
module.exports = {introPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt,
                  populateDepartments, populateRoles, populateEmployees};