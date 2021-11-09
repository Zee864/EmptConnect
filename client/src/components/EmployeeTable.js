import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import getEmployeeData from "../utils/getEmployeeData";
import DateFilter from "./DateFilter";
import FilterByDateToggle from "./FilterByDateToggle";
import ResetToggle from "./ResetToggle";
import createNewEmployee from "../utils/createNewEmployee";
import deleteEmployeeData from "../utils/deleteEmployeeData";
import updateEmployeeData from "../utils/updateEmployeeData";
import "../styles/EmployeeTable.css";

const useStyles = makeStyles({
  errorAlert: {
    backgroundColor: "#212529",
    color: "white",
  },
});

const EmployeeTable = () => {
  // Define the columns used in the table
  // options for this can be found on https://material-table.com/#/docs/all-props under columns section
  const columns = [
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        !rowData.name
          ? { isValid: false, helperText: "Name cannot be empty" }
          : true,
    },
    {
      title: "Surname",
      field: "surname",
      validate: (rowData) =>
        !rowData.surname
          ? { isValid: false, helperText: "Surname cannot be empty" }
          : true,
    },
    {
      title: "Birth Date",
      field: "birthDate",
      type: "date",
      validate: (rowData) =>
        !rowData.birthDate
          ? { isValid: false, helperText: "Birth Date cannot be empty" }
          : true,
    },
    {
      title: "Employee Number",
      field: "employeeNumber",
      type: "numeric",
      validate: (rowData) =>
        !rowData.employeeNumber
          ? { isValid: false, helperText: "Employee Number cannot be empty" }
          : true,
    },
    {
      title: "Salary",
      field: "salary",
      type: "currency",
      currencySetting: { currencyCode: "ZAR" },
      validate: (rowData) =>
        !rowData.salary
          ? { isValid: false, helperText: "Salary cannot be empty" }
          : true,
    },
    {
      title: "Role",
      field: "role",
      validate: (rowData) =>
        !rowData.role
          ? { isValid: false, helperText: "Role cannot be empty" }
          : true,
    },
    {
      title: "Reporting Line",
      field: "reporting_line",
      validate: (rowData) =>
        !rowData.reporting_line
          ? { isValid: false, helperText: "Reporting line cannot be empty" }
          : true,
    },
  ];
  const [employeeTableData, setEmployeeTableData] = useState({});
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getEmployeeData("http://localhost:8000/api/employees")
      .then((data) => {
        setEmployeeTableData(data);
      })
      .catch((error) => {
        console.log(`An error occured while getting the data: ${error}`);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <div className="table-container">
      {employeeTableData &&
      Object.keys(employeeTableData).length !== 0 &&
      Object.getPrototypeOf(employeeTableData) !== Object.prototype ? (
        <>
          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                  className={classes.errorAlert}
                >
                  There are no employees for the selected date!
                </Alert>
              </Snackbar>
            </Stack>
          )}
          <ResetToggle setEmployeeTableData={setEmployeeTableData} />
          <FilterByDateToggle open={open} setOpen={setOpen} />
          {open && (
            <DateFilter
              setEmployeeTableData={setEmployeeTableData}
              setError={setError}
            />
          )}
          <MaterialTable
            style={{
              backgroundColor: "rgba(232, 232, 232, 1)",
              color: "black",
            }}
            title="Employees"
            columns={columns}
            data={employeeTableData}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(async () => {
                    const dataUpdate = [...employeeTableData];
                    dataUpdate.forEach((object, index) => {
                      if (object.employeeNumber === oldData.employeeNumber) {
                        dataUpdate[index] = newData;
                        return true;
                      }
                    });
                    setEmployeeTableData([...dataUpdate]);
                    await updateEmployeeData(
                      "http://localhost:8000/api/employees",
                      { updateObject: newData }
                    );
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(async () => {
                    const dataDelete = [...employeeTableData];
                    dataDelete.forEach((object, index) => {
                      if (object.employeeNumber === oldData.employeeNumber) {
                        dataDelete.splice(index);
                        return true;
                      }
                    });

                    setEmployeeTableData([...dataDelete]);
                    await deleteEmployeeData(
                      "http://localhost:8000/api/employees",
                      { deleteObject: oldData }
                    );
                    resolve();
                  }, 1000);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(async () => {
                    setEmployeeTableData([...employeeTableData, newData]);
                    await createNewEmployee(
                      "http://localhost:8000/api/employees",
                      { newObject: newData }
                    );
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeeTable;
