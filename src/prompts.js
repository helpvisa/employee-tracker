// regular expression definitions
const letterExpression = /[a-zA-Z]/;
const specialExpression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// define the prompts used by the main loop
// multi-purpose list of options shown to user on application start, can be reused
const introPrompt = [
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
]

// shown when a department needs to be added
const addDepartmentPrompt = [
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
]

// shown when a role needs to be added
const addRolePrompt = [
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
        choices: [] // fill this in with a database query
    }
]

// shown when an employee needs to be added
const addEmployeePrompt = [
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
        choices: [] // fill this in with database query
    },
    {
        type: "list",
        name: "manager",
        message: "Please select the employee's manager from the list.",
        choices: [] // fill this in with database query, add "no manager" choice to array as well
    }
]

// shown when an employee needs to be updated
const updateEmployeePrompt = [
    {
        type: "list",
        name: "employee",
        message: "Please select an employee to update from the list.",
        choices: [] // fill this in with database query
    },
    {
        type: "list",
        name: "role",
        message: "Please select the employee's new role from the list.",
        choices: [] // fill this in with database query
    }
]

// export
module.exports = {introPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt};