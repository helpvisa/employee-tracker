// dependencies
db = require('./connection');

// functions which perform CRUD operations on the database
// add a department to the sql database
async function db_addDepartment(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [name];

    let result = await db.promise().query(sql, params);
    // check if result was successful
    if (result[0].affectedRows) {
        // department added
        return true;
    } else {
        // department not added
        return false;
    }
}

// add a role to sql database
async function db_addRole(title, salary, department) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [title, salary, department];

    let result = await db.promise().query(sql, params);
    // check if result was successful
    if (result[0].affectedRows) {
        // role added
        return true;
    } else {
        // role not added
        return false;
    }
}

// add an employee to the database
async function db_addEmployee(first, last, role, manager) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [first, last, role, manager];

    let result = await db.promise().query(sql, params);
    // check if result was successful
    if (result[0].affectedRows) {
        // employee added
        return true;
    } else {
        // employee not added
        return false;
    }
}

// update an employee in the database
async function db_updateEmployee(role, employee) {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [role, employee];

    let result = await db.promise().query(sql, params);
    // check if update was successful
    if (result[0].affectedRows) {
        // employee updated
        return true;
    } else {
        // not updated
        return false;
    }
}

// fetch a single department from the database
async function db_getDepartment(id) {
    const sql = `SELECT name FROM department WHERE id = ?`;
    const params = [id];

    let result = await db.promise().query(sql, params);
    return result[0][0].name; // why on earth is it formatted like this
}

// fetch a single role from the database
async function db_getRole(id) {
    const sql = `SELECT title FROM role WHERE id = ?`;
    const params = [id];

    let result = await db.promise().query(sql, params);
    return result[0][0].title;
}

// fetch a single employee from the database
async function db_getEmployee(id) {
    const sql = `SELECT first_name, last_name FROM employees WHERE id = ?`;
    const params = [id];

    let result = await db.promise().query(sql, params);
    return result[0][0]; // return whole object bc multiple keys
}

module.exports = {db_addDepartment, db_addRole, db_addEmployee, db_updateEmployee, db_getDepartment, db_getRole, db_getEmployee};