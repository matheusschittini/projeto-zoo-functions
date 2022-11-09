const data = require('../data/zoo_data');

const { employees, species } = data;

function getOldestFromFirstSpecies(id) {
  const employee = employees.find((element) => element.id === id);
  const firstSpecieId = employee.responsibleFor[0];
  const specieObject = species.find((element) => element.id === firstSpecieId);
  const sortedArrayAges = specieObject.residents
    .sort((residentA, residentB) => residentB.age - residentA.age);
  const oldestAnimal = sortedArrayAges[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

module.exports = getOldestFromFirstSpecies;
