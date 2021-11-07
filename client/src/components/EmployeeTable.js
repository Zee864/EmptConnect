import MaterialTable from "material-table";
import employeeData from "./data.json";
import "../styles/EmployeeTable.css";

const EmployeeTable = () => {
  const columns = [
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
  ];
  const data = employeeData;

  return (
    <div className="table-container">
      <MaterialTable
        style={{ backgroundColor: "rgba(232, 232, 232, 1)", color: "black" }}
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
          onRowAdd: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
        options={{
          exportButton: true,
          filtering: true,
          headerStyle: {
            backgroundColor: "rgba(232, 232, 232, 1)",
            color: "black",
          },
        }}
      />
    </div>
  );
};

export default EmployeeTable;
