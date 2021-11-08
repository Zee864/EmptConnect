const salaryData = require("./filteredSalaryData.json");
const defaultEmployeeData = require("./data.json");

// Used for getting the month name based on the number e.g., 12 = Decemeber
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
  _employees = defaultEmployeeData;

  get employees() {
    return this._employees;
  }

  set employees(newEmployees) {
    this._employees = newEmployees;
  }

  filter(filterCondition, filterArguments) {
    let sortedEmployeeObject = {};
    if (filterCondition === "reporting_line") {
      this.employees.map((employee) => {
        if (employee.reporting_line === "none")
          sortedEmployeeObject[employee.employeeNumber] = [employee];
        else if (sortedEmployeeObject[employee.reporting_line]) {
          sortedEmployeeObject[employee.reporting_line].push(employee);
        } else sortedEmployeeObject[employee.reporting_line] = [employee];
      });
    } else if (filterCondition === "salary") {
      sortedEmployeeObject = salaryData;
    } else if (filterCondition === "birth_date") {
      if (filterArguments) {
        if (filterArguments.date_of_birth) {
          const filterDate = new Date(
            Date.parse(filterArguments.date_of_birth)
          );
          if (filterArguments.tense === "before") {
            sortedEmployeeObject = this._employees.filter((employee) => {
              const checkDate = new Date(employee.birthDate);
              return checkDate <= filterDate;
            });
            console.log(sortedEmployeeObject);
          } else {
            sortedEmployeeObject = this._employees.filter((employee) => {
              let checkDate = new Date(employee.birthDate);
              return checkDate <= filterDate;
            });
          }
        } else
          return Promise.reject(`Date of birth missing in filter parameters`);
      } else return Promise.reject(`Filter arguments missing`);
    } else {
      sortedEmployeeObject = defaultEmployeeData;
    }

    return sortedEmployeeObject;
  }
}

module.exports = Employee;
