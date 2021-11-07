import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TableChartIcon from "@mui/icons-material/TableChart";
import EmployeeTable from "./EmployeeTable";
import EmployeeHierarchy from "./EmployeeHierarchy";
import "../styles/Employees.css";

const Employees = () => {
  //Used for switching between tabs.
  //Tab 1 has a value 1 and so forth...
  //setValue is used to change value variable when tab is clicked on
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="tab-switcher">
      <Box id="tab-container">
        <Tabs value={value} onChange={handleChange} aria-label="employee-data">
          <Tab icon={<TableChartIcon />} aria-label="table" />
          <Tab icon={<AccountTreeIcon />} aria-label="tree" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EmployeeTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeHierarchy />
      </TabPanel>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return <div role="tabpanel">{value === index && children}</div>;
};

// children contains the tab content that is displayed when the tab is clicked on
// index and value are used to identify which tab is clicked
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Employees;
