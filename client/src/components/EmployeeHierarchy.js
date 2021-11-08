import { useState, useEffect } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import CustomNode from "./CustomNode.js";
import getEmployeeData from "../utils/getEmployeeData.js";
import "../styles/EmployeeHierarchy.css";

const EmployeeHierarchy = () => {
  const [employeeHierarchyData, setEmployeeData] = useState({});

  useEffect(() => {
    getEmployeeData("http://localhost:8000/api/employees?sortBy=salary")
      .then((data) => {
        setEmployeeData(data);
      })
      .catch((error) => {
        console.log(`An error occured while getting the data: ${error}`);
      });
  }, []);

  return (
    <>
      {employeeHierarchyData &&
      Object.keys(employeeHierarchyData).length !== 0 &&
      Object.getPrototypeOf(employeeHierarchyData) !== Object.prototype ? (
        <></>
      ) : (
        <OrganizationChart
          datasource={employeeHierarchyData}
          chartClass="myChart"
          NodeTemplate={CustomNode}
        />
      )}
    </>
  );
};

export default EmployeeHierarchy;
