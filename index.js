const { faker } = require('@faker-js/faker');

const { generateSimple, generateAdvanced } = require('./generateCSV');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`;

const baseConfig = {
  total: 20,
  quota: 6,
  fileKey: '6 to 20',
  code: projectCode(),
};

const advConfig = {
  fileKey: 'PC30-88 MC20-40 Taxi20-60',
  car: { quota: 30, total: 88 },
  motorcycle: { quota: 20, total: 40 },
  taxi: { quota: 20, total: 60 },
  code: projectCode(),
};

((advance = false) => {
  console.log('Generating CSV...', advConfig);
  if (!advance) return generateSimple(baseConfig);
  return generateAdvanced(advConfig);
})(true);
