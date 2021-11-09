const fs = require("fs");
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
  //Holds the list of employees containing thier details
  _employees = defaultEmployeeData;
  get employees() {
    return this._employees;
  }

  add(newData) {
    if (newData) {
      try {
        // add the new data to the existing employees array
        this._employees = [...this._employees, newData];

        //write the new data to the file
        const success = this.writeToFile(
          "./functions/data.json",
          JSON.stringify(this._employees)
        );
        if (success === true) return true;
        return success;
      } catch (error) {
        return error;
      }
    } else return `Invalid or null parameters defined`;
  }

  update(newData) {
    if (newData) {
      // loop through the array to find the object nad overwrite it
      this._employees.forEach((object, index) => {
        if (object.employeeNumber === newData.employeeNumber) {
          this._employees[index] = newData;
          return true;
        }
      });

      // write the updated data to the file
      const success = this.writeToFile(
        "./functions/data.json",
        JSON.stringify(this._employees)
      );
      if (success === true) return true;
      return success;
    }
  }

  delete(objectToDelete) {
    if (objectToDelete) {
      // loop through the array to find the object and get the index
      this._employees.forEach((object, index) => {
        if (object.name === objectToDelete.name) {
          this._employees.splice(index);
          return true;
        }
      });

      // write the updated data to the file
      const success = this.writeToFile(
        "./functions/data.json",
        JSON.stringify(this._employees)
      );
      if (success === true) return true;
      return success;
    } else return `Parameters are not defined`;
  }

  writeToFile(filename, data) {
    try {
      fs.writeFile(filename, data, (err) => {
        if (err) return err;
      });
    } catch (error) {
      return error;
    }
  }

  // filterCondition is the optional parameter sent with sortBy
  // it can be either name, surname, employee_number, birth_date, salary or reporting_line
  // filterArguments are any parameters sent with the filterCondition
  // e.g., the date that needs to be filtered along with the birth_date filterCondition
  filter(filterCondition, filterArguments) {
    let sortedEmployeeObject = {};
    if (filterCondition === "reporting_line") {
      // logic of the algorithm:
      // get each employee's reporting line number which corrosponds to the employee number
      // Thus for each employee they can have 0,1 or more children
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
        // logic of the algorithm:
        // for each employee, get thier birth date and compare against the one sent as a parameter
        // depending on the tense parameter which can be either before or after, the date is filtered
        // for either before the entered date or after
        if (filterArguments.date_of_birth) {
          const filterDate = new Date(
            Date.parse(filterArguments.date_of_birth)
          );
          if (filterArguments.tense === "before") {
            sortedEmployeeObject = this._employees.filter((employee) => {
              const checkDate = new Date(employee.birthDate);
              return checkDate <= filterDate;
            });
          } else {
            sortedEmployeeObject = this._employees.filter((employee) => {
              let checkDate = new Date(employee.birthDate);
              return checkDate >= filterDate;
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

// Singleton pattern used to ensure that all the employee data is fetched once from the database
// and any CRUD operations happen in memory as well as mimicked on the remote database.
// This is to save resources such as cost and time
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Employee();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
