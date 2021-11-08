const express = require("express");
const app = express();
const cors = require("cors");
const Employees = require("./functions/employee.js");
const employees = new Employees().getInstance();

//Enable cors
app.use(cors());

//Use middleware for request processing pipeline
app.use(express.json());

app.get("/", (req, res) => res.send(`Welcome to EmptConnect`));

//Return the list of employees
app.get("/api/employees", (req, res) => {
  try {
    //Check for the optional sortBy parameter
    if (req.query.sortBy)
      return res.send(employees.filter(req.query.sortBy, req.query));
    else return res.send(employees.employees);
  } catch ({ status, message }) {
    return res.status(status).json(message);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
