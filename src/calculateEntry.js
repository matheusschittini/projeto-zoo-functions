const data = require('../data/zoo_data');

const { prices } = data;

function countEntrants(entrants) {
  const numberOfChildren = entrants.filter((element) => element.age < 18).length;
  const numberOfAdults = entrants.filter((element) => element.age >= 18 && element.age < 50).length;
  const numberOfSeniors = entrants.filter((element) => element.age >= 50).length;
  return {
    child: numberOfChildren,
    adult: numberOfAdults,
    senior: numberOfSeniors,
  };
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  } if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const object = countEntrants(entrants);
  const childPrice = prices.child * object.child;
  const adultPrice = prices.adult * object.adult;
  const seniorPrice = prices.senior * object.senior;
  const totalPrice = childPrice + adultPrice + seniorPrice;
  return totalPrice;
}

module.exports = { calculateEntry, countEntrants };
