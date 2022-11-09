const data = require('../data/zoo_data');

const { employees } = data;

function isManager(id) {
  return employees.some((element) => element.managers.includes(id));
}

function getRelatedEmployees(id) {
  if (isManager(id) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  } else if (isManager(id) === true) {
    const managedEMployees = employees.filter((element) => element.managers.includes(id));
    return managedEMployees.map((element) => `${element.firstName} ${element.lastName}`);
  }
}

module.exports = { isManager, getRelatedEmployees };
