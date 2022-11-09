const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(specieName, minAge) {
  const specie = species.find((element) => element.name === specieName);
  const animals = specie.residents;
  return animals.every((element) => element.age >= minAge);
}

module.exports = getAnimalsOlderThan;
