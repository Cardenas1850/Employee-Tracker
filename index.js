const inquire = require("inquirer");
const Database = require("./lib/database");
const connection = require("./lib/connection");


let menuChoicesList = [
    "View departments",
    "View roles",
    "View employees",
    "Add department",
    "Add role",
    "Add employee",
    "Update an employee",
    "Exit"
]

async function menuChoices() {
    inquire.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: menuChoicesList
    }
]) 
.then((answer) => {
    answerPusher(answer);
});
};

async function answerPusher(answer) {
    switch (answer.choice) {
        case "View departments": {
            await viewAllDepartments();
            await menuChoices();
            break;
        }
        case "View roles": {
            await viewAllRoles();
            await menuChoices();
            break;
        }

        case "View employees": {
            await viewAllEmployees();
            await menuChoices();
            break;
        }

        case "Add department": {
            await createNewDepartment();
            await menuChoices();
            break;
        }

        case "Add role": {
            await createNewRole();
            await menuChoices();
            break;
        }

        case "Add employee": {
            await createNewDepartment();
            await menuChoices();
            break;
        }

        case "Update an employee": {
            await updateEmployeeRole();
            await menuChoices();
            break;
        }
        case "Exit":
            runExit();
            break;
    }
};

async function viewAllEmployees() {
    const db = new Database(connection);
    const employees = await db.viewAllEmployees();
    console.table(employees);
};

async function viewAllRoles() {
    const db = new Database(connection);
    const roles = await db.viewAllRoles();
    console.table(roles);
};

async function viewAllDepartments() {
    const db = new Database(connection);
    const departments = await db.viewAllDepartments();
    console.table(departments);
};

async function createEmployee() {
    const db = new Database(connection);
    const allEmployees = await db.viewAllEmployees();
    const employeeNames = allEmployees.map(employee => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    });
    const allRoles = await db.viewAllRoles();
    const employeeRoles = allRoles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    });

    const answer = await inquire.prompt(
        [
        {
            type: "input",
            message: "What is the name of this employee?",
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'last_name'
        },
        {
            type: "list",
            message: "What role will the employee have?",
            choices: employeeRoles,
            name: 'role_id'
        },
        {
            type: "list",
            message: 'Who is the manager?',
            name: "manager_id"
        }]);
};

async function createNewRole() {
    const db = new Database(connection);
    const viewAllDepartments = await db.viewAllDepartments();
    const departmentNames = allDepartments.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });

    const answer = await inquire.prompt( 
        [{
            type: 'input',
            message: "What is the title of the role?",
            name: 'title'
        },
        {
            type: 'input',
            message: "What is the salary for the role?",
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does this role fall under?',
            name: "department_id"
        }])
        .then(role => {
            console.log(role);
            db.createNewRole(role);
        });

};

async function createNewDepartment() {
    const db = new Database(connection);
    await inquire.prompt(
        {
            type: 'input',
            message: 'What is this department?',
            name: 'name'
        }
    )
    .then(name => {
        console.log(name);
        db.createNewDepartment(name);
    });
};

async function updateEmployeeRole() {
    const db = new Database(connection);
    const allEmployees = await db.viewAllEmployees();
    const employeeNames = allEmployees.map(employee => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    });

    const allRoles = await db.viewAllRoles();
    const employeeRoles = allRoles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    }); 
    const answer = await inquire.prompt( 
        [{
            type: 'list',
            message: "Please select the employee to update.",
            choices: employeeNames,
            name: 'id'
        },
        {
            type: "list",
            message: "What role will the employee be taking on?",
            choices: employeeRoles,
            name: "role_id"
        }
    ])
    .then(role => {
        console.log(role);
        db.updateEmployeeRole(role.role_id,  role.id);
    });
};

async function runExit() {
    process.exit(0);
};

menuChoices();