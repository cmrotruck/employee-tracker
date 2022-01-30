const { param } = require("express/lib/request");
const res = require("express/lib/response");
const inquirer = require("inquirer");
const mysql = require("mysql2");

//connect to db
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "!September03!",
    database: "employee_tracker",
  },
  console.log("Connected to the election database.")
);

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      var endProgram = false;
      switch (answers.action) {
        case "View all departments": {
          const sql = `SELECT * FROM department;`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log("\n");
            console.table(results);
            promptUser();
          });
          break;
        }
        case "View all roles": {
          const sql = `SELECT * FROM employee_role;`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log("\n");
            console.table(results);
            promptUser();
          });
          break;
        }
        case "View all employees": {
          const sql = `SELECT * FROM employee;`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log("\n");
            console.table(results);
            promptUser();
          });
          break;
        }
        case "Add a department": {
          inquirer
            .prompt([
              {
                type: "input",
                name: "department",
                message: "Enter name of department:",
              },
            ])
            .then(({ department }) => {
              const sql = `INSERT INTO department (name) VALUES (?)`;
              const params = [department];

              db.query(sql, params, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Added ${department} to the database`);
                  promptUser();
                }
              });
            });
          break;
        }
        case "Add a role": {
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Enter role title: ",
              },
              {
                type: "input",
                name: `salary`,
                message: `Enter the role's salary: `,
              },
            ])
            .then((answers) => {
              const { title, salary, department } = answers;
              const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)`;
              var id;

              const deptSql = `SELECT * FROM department;`;

              db.query(deptSql, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  inquirer
                    .prompt({
                      type: "list",
                      message: "Select department: ",
                      name: "department",
                      choices: results,
                    })
                    .then((input) => {
                      id = results[0].id;
                      const params = [title, salary, id];
                      db.query(sql, params, (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log(`Added ${title} to the database`);
                          promptUser();
                        }
                      });
                    });
                }
              });
            });
          break;
        }
        case "Add an employee": {
            var params = [];
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: `Please enter employee's first_name: `,
              },
              {
                type: "input",
                name: "last_name",
                message: `Please enter employee's last name`,
              },
            ])
            .then((answers) => {
                const { first_name, last_name } = answers;
                params.push(first_name);
                params.push(last_name);

              //get list of roles
              const sql = `SELECT * FROM employee_role;`;
              db.query(sql, (err, rows) => {
                if (err) {
                  console.log(err);
                } else {
                    var roles = [];
                    rows.forEach((row) => {
                        roles.push(row.title);
                    })
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "role",
                        message: `Please select employee's role: `,
                        choices: roles,
                      },
                    ])
                    .then((answer) => {
                      params.push(answer);
                      // get employee Names to get manager id.
                      
                    });
                }
              });
            });
          break;
        }
        default: {
          process.exit(1);
        }
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        //promp couldnt be renedered in the current environment
        console.log("promp couldnt be renedered in the current environment");
      } else {
        //something else went wrong
        console.log("something else went wrong");
      }
    });
}

promptUser();
