class Database {
    constructor(connection) {
        this.connection = connection;
    };

    // functions to view portion of databases
    viewAllRoles() {
        return this.connection.query(
            `SELECT * FROM roles`
        )
    };
    viewAllEmployees() {
        return this.connection.query(
            `SELECT * FROM employees`
        )
    };
    viewAllDepartments() {
        return this.connection.query(
            `SELECT * FROM departments`
        )
    };

    //create new items in database

    createNewRole(role) {
        return this.connection.query(
            `INSERT INTO roles SET ?`, role
        )
    };

    createNewEmployee(employee) {
        return this.connection.query(
            `INSERT INTO employees SET ?`, employee
        )
    };

    createNewDepartment(name) {
        return this.connection.query(
            `INSERT INTO roles SET ?`, name
        )
    };

    updateEmployeeRole(roleId, employeeId) {
        return this.connection.query(
            `UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`
        )
    };
}

module.exports = Database;