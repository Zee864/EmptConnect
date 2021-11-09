const fs = require("fs");
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

  sortBySalary() {
    // Array to hold the employees sorted by salary
    let salarySortedEmployees = JSON.parse(JSON.stringify(this._employees));
    // Array to hold the employees sorted by salary and grouped by role
    let roleSortedEmployees = [];
    // Object to write to the filteredSalaryData.json file
    // This will be used to make the tree
    let fullySortedEmployees = { title: "EmptConnect", children: [] };

    // Sort by the highest salary
    roleSortedEmployees = salarySortedEmployees.sort((element1, element2) => {
      return element1.salary > element2.salary;
    });

    // Sort by the role with the following hierarchy: Manager > Employee > Trainee
    roleSortedEmployees = roleSortedEmployees.sort((element1, element2) => {
      if (element2.role === "Manager" && element1.role !== "Manager") return -1;
      else if (element2.role === "Employee" && element1.role === "Trainee")
        return -1;
    });

    roleSortedEmployees.reverse();

    let tempArray = fullySortedEmployees;
    let previous = null;

    for (let i = 0; i < roleSortedEmployees.length; i++) {
      if (tempArray === fullySortedEmployees) {
        tempArray.children = [];
        tempArray.children.push(roleSortedEmployees[i]);
        tempArray = roleSortedEmployees[i];
        previous = fullySortedEmployees;
      } else {
        if (roleSortedEmployees[i].role === tempArray.role) {
          previous.children[previous.children.length] = roleSortedEmployees[i];
          tempArray = roleSortedEmployees[i];
        } else {
          tempArray.children = [];
          tempArray.children.push(roleSortedEmployees[i]);
          previous = tempArray;
          tempArray = roleSortedEmployees[i];
        }
      }
    }

    return JSON.stringify(fullySortedEmployees);
  }

  add(newData) {
    if (newData) {
      try {
        // add the new data to the existing employees array
        const addObject = {
          name: newData.name,
          surname: newData.surname,
          birthDate: newData.birthDate,
          employeeNumber: newData.employeeNumber,
          salary: newData.salary,
          role: newData.role,
          reporting_line: newData.reporting_line,
        };
        this._employees = [...this._employees, addObject];

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
      const updateObject = {
        name: newData.name,
        surname: newData.surname,
        birthDate: newData.birthDate,
        employeeNumber: newData.employeeNumber,
        salary: newData.salary,
        role: newData.role,
        reporting_line: newData.reporting_line,
      };

      // loop through the array to find the object nad overwrite it
      this._employees.forEach((object, index) => {
        if (object.employeeNumber === updateObject.employeeNumber) {
          this._employees[index] = updateObject;
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
      const deleteObject = {
        name: objectToDelete.name,
        surname: objectToDelete.surname,
        birthDate: objectToDelete.birthDate,
        employeeNumber: objectToDelete.employeeNumber,
        salary: objectToDelete.salary,
        role: objectToDelete.role,
        reporting_line: objectToDelete.reporting_line,
      };

      // loop through the array to find the object and get the index
      this._employees.forEach((object, index) => {
        if (object.name === deleteObject.name) {
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
      sortedEmployeeObject = this.sortBySalary();
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
