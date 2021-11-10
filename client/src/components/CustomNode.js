import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../styles/CustomNode.css";

const CustomNode = ({ nodeData }) => {
  return (
    // Hierarchy for the employees where they are sorted according to the highest salary and grouped by role
    <div id="profile-container">
      <Card id="employee-card">
        <CardContent>
          {/* Check if title is defined to render the first node */}
          <Typography className={"MuiTypography--heading mb-3"} variant={"h5"}>
            {nodeData.title
              ? nodeData.title
              : nodeData.role &&
                nodeData.name &&
                nodeData.surname &&
                `${nodeData.role} - ${nodeData.name} ${nodeData.surname}`}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {!nodeData.title && nodeData.birthDate && (
              <p>
                D.O.B -{" "}
                {new Date(Date.parse(nodeData.birthDate)).toLocaleDateString()}
              </p>
            )}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {!nodeData.title && nodeData.employeeNumber && (
              <p>Employee Number - {nodeData.employeeNumber}</p>
            )}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {!nodeData.title && nodeData.salary && (
              <p>
                Salary - ZAR
                {nodeData.salary
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </p>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// Represents the data for each employee card
// An object containing the: title (for the first card only), name, surname, role, birthDate and salary,
const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

CustomNode.propTypes = propTypes;

export default CustomNode;
