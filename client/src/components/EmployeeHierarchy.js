import { useState, useEffect } from "react";
import getEmployees from "../utils/getEmployees";

const EmployeeHierarchy = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setEmployees(await getEmployees());
    };

    fetchData();
  }, []);

  const employeeCard = () => {
    const keys = Object.keys(employees);
    const values = Object.values(employees);

    return (
      <>
        {/* {keys.map((key) => {
                    console.log(employees[key])
                })} */}
      </>
    );
  };

  return (
    <div className="org-tree">
      Employee Chart
      {employeeCard()}
    </div>
  );
};

export default EmployeeHierarchy;
