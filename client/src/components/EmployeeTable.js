import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import getEmployeeData from "../utils/getEmployeeData";
import DateFilter from "./DateFilter";
import "../styles/EmployeeTable.css";
import FilterByDateToggle from "./FilterByDateToggle";

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
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeeTable;
