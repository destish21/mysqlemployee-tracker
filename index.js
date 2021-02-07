const inquirer = require('inquirer')
const mysql = require('mysql')
const myTable = require('console.table');

// Creating a connection between database and localhost using port 3306
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12#root2021',
    database: 'employees'
});

//creating connection using a specific threadId to run startProgram function
connection.connect(err => {
    if (err) throw err;
    console.log(`connected to mysql on thread${connection.threadId}`)
    runPromt()
});

const options = [
    "View All employees?",
    "View All employees By Roles?",
    "View All Managers?",
    "View All Department?",
    "View all employees By Departmens?",
    "Add Employee?",
    "Update Employee?",
    "Add Role?",
    "Add Department?",
    "Remove Employee?",
    "View All Employee Budget?",
    "Exit"
]

const runPromt = () => {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: options
        }

    ]).then(answer => {
        switch (answer.choice) {
            case "View All employees?":
                viewAllemployees();
                break;

            case "View All employees By Roles?":
                viewAllRoles();
                break;

            case "View All Managers?":
                    viewAllManagers();
                    break;


            case "View All Department?":
                viewAllDepartment();
                break;

            case "View all employees By Departmens?":
                viewEByDepartments();
                break;

            case "Add Employee?":
                AddEmployee();
                break;

            case "Update Employee?":
                updateEmployeeRole();
                break;

            case "Add Role?":
                AddRole();
                break;

            case "Add Department?":
                AddDepartment();
                break;


            case "Remove Employee?":
                removedEmployee();
                break;

            case "View All Employee Budget?":
                EmployeeBudget();
                break;

            case "Exit":
                exitTracker();

        }
    })
}

//case 1. View All employees?
const viewAllemployees = () => {
    var query = "SELECT employeeT.id, employeeT.first_name, employeeT.last_name, role.title, role.salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employeeT INNER JOIN  role on role.id = employeeT.role_id INNER JOIN department on department.id = role.department_id left join employeeT e on employeeT.manager_id = e.id;";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('_______________________________________________________________________________________________')
        console.table(res);
        console.log('_______________________________________________________________________________________________')
        runPromt();
    })
}

//case 2. View All Employee's By Roles?
const viewAllRoles = () => {
    var query = "SELECT employeeT.first_name, employeeT.last_name, role.title AS Title FROM employeeT JOIN role ON employeeT.role_id = role.id;";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('_______________________________________________')
        console.table(res);
        console.log('_______________________________________________')
        runPromt();
    })
}

const viewAllManagers = () => {
    connection.query('SELECT * FROM employeeT WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err;
        console.log('_________________________________________________')
        console.table(res);
        console.log('_________________________________________________')

        runPromt();

    })
}

const viewAllDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        console.log('___________________')
        console.table(res);
        console.log('____________________')
        runPromt();

    })
}

//cas 3. View all Emplyees By Deparments
const viewEByDepartments = () => {
    var query = "SELECT employeeT.first_name, employeeT.last_name, department.name AS Department FROM employeeT JOIN role ON employeeT.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employeeT.id;";
    connection.query(query,
        (err, res) => {
            if (err) throw err;
            console.log('__________________________________________________________')
            console.table(res);
            console.log('__________________________________________________________')

            runPromt();
       })
}

//case 4. Add Employee?
const AddEmployee = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "Manager's name?",
            choices: selectManager()
        }
    ]).then(val => {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.manager) + 1
        var firstName = val.firstname;
        var lastName = val.lastname
        connection.query("INSERT INTO employeeT SET ?",
            {
                first_name: firstName,
                last_name: lastName,
                manager_id: managerId,
                role_id: roleId
            }, (err) => {
                if (err) throw err;
                console.log('__________________________________________________')

                console.table(val);
                console.log('__________________________________________________')

                runPromt();
            })
    })
}

//case 4. choieces 1
var roleArr = [];
selectRole = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

//case 4. choice 2
var managersArr = [];
selectManager = () => {
    connection.query("SELECT first_name, last_name FROM employeeT WHERE manager_id IS NULL", (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
}

//case 5. Update employee
const updateEmployeeRole = () => {
    var query1 = (
        "SELECT e.first_name, e.last_name, e.id," +
        "CONCAT(e.first_name, ' ', e.last_name) AS full_Name " +
        "FROM employeeT AS e"
    );
    connection.query(query1, (err, resN) => {
        if (err) throw err;
        // collect all the response full name into an array to be used by as achoice list for the prompt
        var employeeNaneArr = [];
        for (var i = 0; i < resN.length; i++) {
            employeeNaneArr.push(resN[i].full_Name);
        }
        inquirer.prompt(
            [{
                name: "employeeName",
                type: "list",
                message: "Name of employee to update?",
                choices: employeeNaneArr
            }]
        ).then(resName => {
            // if a name to update is selected then; 
            //collect role titles from the query to be used as an araray choices for role prompt
            connection.query("SELECT r.title, r.id FROM role AS r", (err, resR) => {
                if (err) throw err;
                var roleTitlesArr = [];
                for (var i = 0; i < resR.length; i++) {
                    roleTitlesArr.push(resR[i].title);
                }
                inquirer.prompt(
                    [{
                        name: "titleRole",
                        type: "list",
                        message: "Select the new role!",
                        choices: roleTitlesArr
                    }]
                ).then(resRole => {
                    //for each response  asign the preupdated employee id to that particular person updated.
                    resN.forEach(person => {
                        if (resName.employeeName === person.full_Name) {
                            employeeID = person.id;
                        }
                    });
                    var roleID = 0;
                    resR.forEach(position => {
                        if (position.title === resRole.titleRole) {
                            roleID = position.id;
                        }
                    })
                    connection.query("UPDATE employeeT SET role_id=(?) WHERE id=(?)", [roleID, employeeID], (err3, res3) => {
                        if (err3) throw err3;
                        console.log(`${resName.employeeName}'s role is updated to ${resRole.titleRole}.`);
                        runPromt();
                    })
                })
            })
        })
    })
}

//case 6. add role
const AddRole = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", (err, res) => {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(res => {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                err => {
                    if (err) throw err
                    console.log('__________________________________________________')
                    console.table(res);
                    console.log('__________________________________________________')

                    runPromt();
                }
            )
        });
    });
}

//case 7. adding department
const AddDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(res => {
        connection.query("INSERT INTO department SET ? ",
            {
                name: res.name
            },
            err => {
                if (err) throw err
                console.log('__________________________________________________')

                console.table(res);
                console.log('__________________________________________________')

                runPromt();
            }
        )
    })
}

//case 8. deleting employee
const removedEmployee = () => {
    connection.query("SELECT * FROM employeeT", (err, resId) => {
        var array = [];
        for (let index = 0; index < resId.length; index++) {
            const element = resId[index].first_name + ' ' + resId[index].last_name;
            array.push(element)
        }
        //console.log(array)
        inquirer.prompt(
            {
                name: "employeeName",
                type: "list",
                message: "Enter employee's id to be deleted?",
                choices: array
            }
        ).then(answer => {
            connection.query("DELETE FROM employeeT WHERE first_name= ?", answer.employeeName)
            console.log("\n" + answer.employeeName + " is successfuly removed!\n")
            runPromt();
        })
    })

}

//case 9. employee budget
const EmployeeBudget = () => {
    inquirer.prompt(
        {
            name: "budget",
            type: "confirm",
            message: "Do you want to know employee budget? (y/n)"
        }
    ).then(yes => {
        if (!yes.budget) return runPromt();
        ;
        console.log('\nCompany Employee and theier salary')
        console.log('--------------------------------------')
        var query = "SELECT employeeT.id, employeeT.first_name, employeeT.last_name, role.salary FROM employeeT INNER JOIN  role on role.id = employeeT.role_id left join employeeT e on employeeT.manager_id = e.id;"
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('___________________________________')
            console.table(res);
            console.log('____________________________________')

            //get another connection
            var salaryArr = [];
            for (let index = 0; index < res.length; index++) {
                const element = res[index].salary;
                salaryArr.push(element);
            }
            var totalBuget = 0;
            for (var i = 0; i < salaryArr.length; i++) {
                totalBuget += parseInt(salaryArr[i]);
            }
            console.log('--------------------------------')
            console.log("employees Total Budget = " + totalBuget)
            console.log('\n')
            runPromt();
        })
    })
}
const exitTracker = () => {
    connection.end();
}


