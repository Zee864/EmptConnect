import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import getEmployees from "../utils/getEmployees";
import employeeData from "./data.json";

const getData = async () => {
  return await getEmployees();
};

const EmployeeTable = () => {
  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
    },
    { title: "Birth Date", field: "birthDate", type: "date" },
    {
      title: "Employee Number",
      field: "employeeNumber",
      type: "numeric",
    },
    {
      title: "Salary",
      field: "salary",
      type: "currency",
      currencySetting: { currencyCode: "ZAR" },
    },
    {
      title: "Role",
      field: "role",
    },
  ]);

  const [data, setData] = useState(employeeData);

  return (
    <div
      style={{
        marginRight: "22%",
        width: "78%",
        float: "right",
        marginTop: "2%",
      }}
    >
      <MaterialTable
        title="Employees"
        columns={columns}
        data={data}
        editable={{
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
        options={{
          exportButton: true,
          filtering: true,
        }}
      />
    </div>
  );
};

export default EmployeeTable;
