const data = require('../data/zoo_data');

const { species, hours } = data;

// Função cujo parâmetro é um dia e retorna um array de animais disponíveis nesse dia
function getAnimalsByDay(day) {
  if (day === 'Monday') {
    return 'The zoo will be closed!';
  } const arrayAnimals = species.filter((element) => element.availability
    .includes(day)).map((element) => element.name);
  return arrayAnimals;
}

// Função que analisa os horários de abertura e fechamento de cada dia (parâmetro) e retorna o texto de 'OfficeHour'
function officeHourGenerator(day) {
  if (day === 'Monday') {
    return 'CLOSED';
  } const hourToOpen = hours[day].open;
  const hourToClose = hours[day].close;
  return `Open from ${hourToOpen}am until ${hourToClose}pm`;
}

// Função cujo parâmetro é a espécie do animal e ela te retorna os dias da semana em que eles estão disponíveis
function getAnimalAvailability(animal) {
  const arrayDaysAnimalIsAvailable = species
    .find((element) => element.name === animal).availability;
  return arrayDaysAnimalIsAvailable;
}

// Função que não tem parâmetros e retorna os horários para cada dia e quais animais estarão disponíveis
function createGeneralSchedule() {
  const returnedObject = { Tuesday: { officeHour: officeHourGenerator('Tuesday'),
    exhibition: getAnimalsByDay('Tuesday') },
  Wednesday: { officeHour: officeHourGenerator('Wednesday'),
    exhibition: getAnimalsByDay('Wednesday') },
  Thursday: { officeHour: officeHourGenerator('Thursday'),
    exhibition: getAnimalsByDay('Thursday') },
  Friday: { officeHour: officeHourGenerator('Friday'), exhibition: getAnimalsByDay('Friday') },
  Saturday: { officeHour: officeHourGenerator('Saturday'),
    exhibition: getAnimalsByDay('Saturday') },
  Sunday: { officeHour: officeHourGenerator('Sunday'), exhibition: getAnimalsByDay('Sunday') },
  Monday: { officeHour: officeHourGenerator('Monday'), exhibition: getAnimalsByDay('Monday') } };
  return returnedObject;
}

const daysOfWeek = Object.keys(hours);

// Função que analisa se o parâmetro é um dia ou uma espécie
function isItAnimalOrDay(parameter) {
  const arraySpeciesNames = [];
  species.forEach((element) => arraySpeciesNames.push(element.name));
  if (arraySpeciesNames.includes(parameter)) return 'itsAnimal';
  if (daysOfWeek.includes(parameter)) return 'itsDay';
  return false;
}

// Função que cria o schedule para um dia específico, retornando os horários para aquele dia e quais animais estarão disponíveis
function scheduleDayGenerator(day) {
  if (day === 'Monday') {
    return { Monday: { officeHour: officeHourGenerator('Monday'),
      exhibition: getAnimalsByDay('Monday') } };
  } const newObject = {};
  const newObjectValues = {
    officeHour: officeHourGenerator(day),
    exhibition: getAnimalsByDay(day),
  };
  const foundDay = daysOfWeek.find((element) => element === day);
  newObject[foundDay] = newObjectValues;
  return newObject;
}

// Função principal
function getSchedule(parameter) {
  const animalOrDay = isItAnimalOrDay(parameter);
  if (!parameter || isItAnimalOrDay(parameter) === false) return createGeneralSchedule();
  if (animalOrDay === 'itsAnimal') return getAnimalAvailability(parameter);
  if (animalOrDay === 'itsDay') return scheduleDayGenerator(parameter);
}

module.exports = getSchedule;
