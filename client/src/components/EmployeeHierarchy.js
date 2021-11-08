import { useState, useEffect } from "react";
import axios from "axios";
import OrganizationChart from "@dabeng/react-orgchart";
import CustomNode from "./CustomNode.js";
import "../styles/EmployeeHierarchy.css";

const EmployeeHierarchy = () => {
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/employees?sortBy=salary"
        );
        setEmployeeData(res.data);
      } catch (error) {
        console.log(
          `An error occured while getting the employee data: ${error}`
        );
      }
    };
    getEmployeeData();
  }, []);

  return (
    <OrganizationChart
      datasource={employeeData}
      chartClass="myChart"
      NodeTemplate={CustomNode}
    />
  );
};

export default EmployeeHierarchy;
