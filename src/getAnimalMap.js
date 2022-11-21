const data = require('../data/zoo_data');

const { species } = data;

// Função que recebe uma região como parâmetro e retorna um array com os nomes das espécies dessa região
function getSpeciesForLocation(location) {
  const arrayAnimalNames = [];
  const animals = species.filter((element) => element.location === location);
  animals.forEach((element) => {
    arrayAnimalNames.push(element.name);
  });
  return arrayAnimalNames;
}

// Função que verifica se a opção includeNames está especificada no parâmetro da função principal
function verifyIncludeNames(parameter) {
  const arrayKeys = Object.keys(parameter);
  const array = [];
  arrayKeys.forEach((element) => {
    if (element === 'includeNames') {
      array.push(element);
    }
  });
  if (array.length === 0) {
    return false;
  } return true;
}

// Função que cria a localização geral de todas as espécies
function createGeneralLocation() {
  return {
    NE: getSpeciesForLocation('NE'),
    NW: getSpeciesForLocation('NW'),
    SE: getSpeciesForLocation('SE'),
    SW: getSpeciesForLocation('SW'),
  };
}

// Função que retorna os nomes dos animais por área, levando em conta a possibilidade de ordenação alfabética desses nomes
function getAnimalNames(location, sort) {
  let object = {};
  let animalArray = [];
  const arrayResult = [];
  const animals = species.filter((element) => element.location === location);
  animals.forEach((element) => {
    element.residents.forEach((element1) => {
      animalArray.push(element1.name);
    });
    if (sort) animalArray.sort();
    object[element.name] = animalArray;
    arrayResult.push(object);
    animalArray = [];
    object = {};
  });
  return arrayResult;
}

// Função que retorna os nomes das espécies por nome, levando em conta o sexo e a região
function getAnimalNameBySex(location, sex, sort) {
  let object = {};
  let animalArray = [];
  const arrayResult = [];
  const animals = species.filter((element) => element.location === location);
  animals.forEach((element) => {
    element.residents.forEach((element1) => {
      if (element1.sex === sex) animalArray.push(element1.name);
    });
    if (sort) animalArray.sort();
    object[element.name] = animalArray;
    arrayResult.push(object);
    animalArray = [];
    object = {};
  });
  return arrayResult;
}

// Função que analisa se o sexo é especificado ou não como parâmetro
function getAnimalNameByRegionSex(location, sex, sort) {
  if (!sex) return getAnimalNames(location, sort);
  return getAnimalNameBySex(location, sex, sort);
}

// Função que gera a localização geral dos animais, levando em conta o sexo e a ordenação alfabética de seus nomes
function createGeneralLocation2(sex, sort) {
  return {
    NE: getAnimalNameByRegionSex('NE', sex, sort),
    NW: getAnimalNameByRegionSex('NW', sex, sort),
    SE: getAnimalNameByRegionSex('SE', sex, sort),
    SW: getAnimalNameByRegionSex('SW', sex, sort),
  };
}

// Função principal
function getAnimalMap(options) {
  if (!options) return createGeneralLocation();
  if (typeof (options) === 'object') {
    const includeNames = verifyIncludeNames(options);
    if (!includeNames) return createGeneralLocation();
    return createGeneralLocation2(options.sex, options.sorted);
  }
}

module.exports = getAnimalMap;
