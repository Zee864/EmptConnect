class Employee {
    _employees = [{
        name: "john",
        surname: "smith",
        birth_date: new Date(1980, 11, 18),
        employee_number: 1,
        salary: 700000.00,
        role_description: "manager",
        reporting_line: "none"
     }, {
        name: "jane",
        surname: "doe",
        birth_date: new Date(1995, 01, 31),
        employee_number: 2,
        salary: 150000.00,
        role_description: "employee",
        reporting_line: 4
    }, {
        name: "jane",
        surname: "doe",
        birth_date: new Date(1995, 01, 31),
        employee_number: 3,
        salary: 150000.00,
        role_description: "employee",
        reporting_line: 1
    }]

    get employees(){
        return this._employees;
    }

    filter(filterCondition){
        let sortedEmployeeObject = {};
        if(filterCondition === 'reporting_line'){
            this.employees.map((employee) => {
                if(employee.reporting_line === "none")
                    sortedEmployeeObject[employee.employee_number] = [employee];
                else
                    if(sortedEmployeeObject[employee.reporting_line]){
                        sortedEmployeeObject[employee.reporting_line].push(employee);
                    }
                    else
                        sortedEmployeeObject[employee.reporting_line] = [employee];
            });
        }
        else
            sortedEmployeeObject = this.employees;

        return sortedEmployeeObject;
    }
}

module.exports = Employee;