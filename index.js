const { faker } = require('@faker-js/faker');

const { generateAdvanced } = require('./generateCSV');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`;

const advConfig = {
  car: { quota: 30, total: 88 },
  // motorcycle: { quota: 20, total: 40 },
  taxi: { quota: 20, total: 60 },
  code: projectCode(),
};

(() => {
  console.log('Generating CSV...', advConfig);
  return generateAdvanced(advConfig);
})(true);
