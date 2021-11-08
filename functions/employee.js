const salaryData = require("./data.json");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Employee {
  _employees = [
    {
      name: "john",
      surname: "smith",
      birthDate: `${new Date(1980, 11, 18).getDate()} ${
        months[new Date(1980, 11, 18).getMonth()]
      } ${new Date(1980, 11, 18).getFullYear()}`,
      employeeNumber: 1,
      salary: 700000.0,
      role: "manager",
      reporting_line: "none",
    },
    {
      name: "jane",
      surname: "doe",
      birthDate: `${new Date(1995, 01, 31).getDay()} ${
        months[new Date(1995, 01, 31).getMonth()]
      } ${new Date(1995, 01, 31).getFullYear()}`,
      employeeNumber: 2,
      salary: 150000.0,
      role: "employee",
      reporting_line: 4,
    },
    {
      name: "jane",
      surname: "doe",
      birthDate: `${new Date(1995, 01, 31).getDay()} ${
        months[new Date(1995, 01, 31).getMonth()]
      } ${new Date(1995, 01, 31).getFullYear()}`,
      employeeNumber: 3,
      salary: 150000.0,
      role: "employee",
      reporting_line: 1,
    },
  ];

  get employees() {
    return this._employees;
  }

  filter(filterCondition) {
    let sortedEmployeeObject = {};
    if (filterCondition === "reporting_line") {
      this.employees.map((employee) => {
        if (employee.reporting_line === "none")
          sortedEmployeeObject[employee.employeeNumber] = [employee];
        else if (sortedEmployeeObject[employee.reporting_line]) {
          sortedEmployeeObject[employee.reporting_line].push(employee);
        } else sortedEmployeeObject[employee.reporting_line] = [employee];
      });
    } else if (filterCondition === "salary") sortedEmployeeObject = salaryData;
    else sortedEmployeeObject = this.employees;

    return sortedEmployeeObject;
  }
}

module.exports = Employee;
