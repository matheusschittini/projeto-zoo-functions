const data = require('../data/zoo_data');

const { species } = data;

function getSpeciesByIds(...ids) {
  const array = [];
  if (ids.length === 0) {
    return array;
  } if (ids.length === 1) {
    const specie = species.find((element) => element.id === ids[0]);
    array.push(specie);
    return array;
  } if (ids.length > 1) {
    ids.forEach((idsElement) => {
      const specie = species.find((element) => element.id === idsElement);
      array.push(specie);
    });
    return array;
  }
}

module.exports = getSpeciesByIds;
