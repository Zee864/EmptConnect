import OrganizationChart from "@dabeng/react-orgchart";
import CustomNode from "./CustomNode.js";
import "../styles/EmployeeHierarchy.css";

const EmployeeHierarchy = () => {
  const employeeData = {
    title: "EmptConnect",
    children: [
      {
        name: "John",
        surname: "Smith",
        birthDate: "10 January 1980",
        employeeNumber: 1,
        salary: 700000.0,
        role: "Manager",
        children: [
          {
            name: "Jane",
            surname: "Doe",
            birthDate: "18 February 1997",
            employeeNumber: 2,
            salary: 150000.0,
            role: "Employee",
          },
        ],
      },
      {
        name: "John",
        surname: "Smith",
        birthDate: "10 January 1980",
        employeeNumber: 1,
        salary: 700000.0,
        role: "Manager",
      },
      {
        name: "John",
        surname: "Smith",
        birthDate: "10 January 1980",
        employeeNumber: 1,
        salary: 700000.0,
        role: "Manager",
      },
    ],
  };

  return (
    <OrganizationChart
      datasource={employeeData}
      chartClass="myChart"
      NodeTemplate={CustomNode}
    />
  );
};

export default EmployeeHierarchy;