const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(object) {
  if (!object) {
    const returnedObject = {};
    species.forEach((element) => {
      const numberOfAnimals = element.residents.length;
      returnedObject[element.name] = numberOfAnimals;
    });
    return returnedObject;
  } if (!object.sex) {
    return species.find((element) => element.name === object.specie).residents.length;
  }
  return species.find((element) => element.name === object.specie).residents
    .filter((element) => element.sex === object.sex).length;
}

module.exports = countAnimals;
