import Button from "react-bootstrap/Button";
import "../styles/FilterByDateToggle.css";

const FilterByDateToggle = ({ open, setOpen }) => {
  const showForm = () => {
    setOpen(!open);
  };
  let message = "";
  if (open) message = "Close";
  else message = "Filter By Date";

  return (
    <Button variant="dark" id="date-form-toggle" onClick={showForm}>
      {message}
    </Button>
  );
};

export default FilterByDateToggle;
