const data = require('../data/zoo_data');

const { employees } = data;

function getEmployeeByName(firstOrLastName) {
  if (!firstOrLastName) {
    return {};
  }
  const employee = employees.find((element) =>
    element.firstName === firstOrLastName || element.lastName === firstOrLastName);
  return employee;
}

module.exports = getEmployeeByName;
