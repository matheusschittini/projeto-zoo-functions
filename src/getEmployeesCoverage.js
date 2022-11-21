const data = require('../data/zoo_data');

const { species } = data;
const { employees } = data;

// Função cujo parâmetro é o id do funcionário e que retorna um array com os nomes das espécies pelas quais que ele é responsável
function getSpeciesResponsibleFor(employeeId) {
  const foundEmployee = employees.find((element) => element.id === employeeId);
  const arraySpecies = foundEmployee.responsibleFor;
  const arrayObjectsSpecies = [];
  arraySpecies.forEach((element1) => {
    arrayObjectsSpecies.push(species.find((element2) => element2.id === element1));
  });
  const arraySpeciesNames = arrayObjectsSpecies.map((element) => element.name);
  return arraySpeciesNames;
}

// Função cujo parâmetro é o id do funcionário e retorna as áreas em que ele atua
function getAreas(employeeId) {
  const foundEmployee = employees.find((element) => element.id === employeeId);
  const arraySpecies = foundEmployee.responsibleFor;
  const arrayObjectsSpecies = [];
  arraySpecies.forEach((element1) => {
    arrayObjectsSpecies.push(species.find((element2) => element2.id === element1));
  });
  const arrayAreas = arrayObjectsSpecies.map((element) => element.location);
  return arrayAreas;
}

// Função, sem parâmetro, que retorna um array com a cobertura de todos os funcionários
function generateAllEmployessCoverage() {
  const returnedArray = [];
  employees.forEach((element) => {
    const employeeObject = {
      id: element.id,
      fullName: `${element.firstName} ${element.lastName}`,
      species: getSpeciesResponsibleFor(element.id),
      locations: getAreas(element.id),
    };
    returnedArray.push(employeeObject);
  });
  return returnedArray;
}

// Função que verifica o parâmetro da função principal
function verifyParameter(parameter) {
  const isId = employees.some((element) => element.id === parameter.id);
  const isItFirstName = employees.some((element) => element.firstName === parameter.name);
  const isItLastName = employees.some((element) => element.lastName === parameter.name);
  if (isId) return 'itsId';
  if (isItFirstName || isItLastName) return 'itsName';
  return false;
}

// Função geral
function getEmployeesCoverage(object) {
  if (!object) return generateAllEmployessCoverage();
  const parameterType = verifyParameter(object);
  if (!parameterType) throw new Error('Informações inválidas');
  if (parameterType === 'itsId') {
    return generateAllEmployessCoverage().find((element) => element.id === object.id);
  } if (parameterType === 'itsName') {
    const employee = employees
      .find((element) => element.firstName === object.name || element.lastName === object.name);
    return generateAllEmployessCoverage().find((element) => element.id === employee.id);
  }
}

module.exports = getEmployeesCoverage;
