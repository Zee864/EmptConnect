import Button from "react-bootstrap/Button";
import getEmployeeData from "../utils/getEmployeeData";
import "../styles/ResetToggle.css";

const ResetToggle = ({ setEmployeeTableData }) => {
  const resetTable = async () => {
    const defaultEmployeeData = await getEmployeeData(
      "http://localhost:8000/api/employees"
    );
    setEmployeeTableData(defaultEmployeeData);
  };
  return (
    <Button variant="dark" onClick={resetTable} id="reset-toggle">
      Reset
    </Button>
  );
};

export default ResetToggle;
