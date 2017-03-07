'use strict';

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('example.sqlite');

const dropEmployees = () => {
	db.run(`DROP TABLE employees`);
};
//dropEmployees();


// Creates the employee table if it does not exist
// Will not execute if the table exists
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");


//populates employee table with json data
const populateEmployees = () => {

	const { list } = require('./employees.json');

	list.forEach( each => {
		db.run(`INSERT INTO employees VALUES (
			${each.id},
			"${each.firstName}",
			"${each.lastName}",
			${each.salary},
			"${each.department}"
			)`);
	})
};
//populateEmployees();


//not the best option - only selects the first row
// db.get(`SELECT * FROM employees`, (err, row) => {
// 	console.log(row)
// });


//retrieves all info
db.all(`SELECT * FROM employees`, (err, allRows) => {
	console.log(allRows);
	allRows.forEach(( {id, first, last, department, salary} ) => {
		console.log(`
		${id} ${first} ${last}
		from ${department} Department.
		Salary: ${salary}
		`);
	});
});
