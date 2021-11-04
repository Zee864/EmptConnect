const getEmployees = async () => {
  const res = await fetch(
    "http://localhost:8000/api/employees?sortBy=reporting_line"
  );
  const data = await res.json();
  return data;
};

module.exports = getEmployees;
