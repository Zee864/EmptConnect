import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import getEmployeeData from "../utils/getEmployeeData";

const DateFilter = ({ setEmployeeTableData, setError }) => {
  const filterByDate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataValues = Object.values(
      Object.fromEntries(formData.entries())
    );
    const filteredData = await getEmployeeData(
      `http://localhost:8000/api/employees?sortBy=birth_date&date_of_birth=${formDataValues[0]}&tense=${formDataValues[1]}`
    );

    if (filteredData && filteredData.length > 0)
      setEmployeeTableData(filteredData);
    else setError(true);
  };

  return (
    <Form className="mb-5" onSubmit={filterByDate} method="POST">
      <Form.Group controlId="dateFilter" className="mb-3">
        <Form.Label>Birth Date</Form.Label>
        <Form.Control required type="date" name="date_of_birth" />
        <Form.Text className="text-muted">
          Pick a date to filter employees by birth date e.g., employees born
          after 1970/01/01
        </Form.Text>
      </Form.Group>
      <div className="mb-2">
        <Form.Check
          required
          inline
          name="tense"
          type="radio"
          label="Before"
          value="before"
        />
        <Form.Check
          required
          inline
          name="tense"
          type="radio"
          label="After"
          value="after"
        />
      </div>
      <Button variant="dark" type="submit" className="mt-2">
        Filter
      </Button>
    </Form>
  );
};

export default DateFilter;
