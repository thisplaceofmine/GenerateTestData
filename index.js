const { faker } = require('@faker-js/faker');

const { generateAdvanced } = require('./generateCSV');
const { deleteFolderSync } = require('./zipFolder');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`.toUpperCase();

const advConfig = {
  car: { quota: 15, total: 30 },
  motorcycle: { quota: 15, total: 30 },
  taxi: { quota: 15, total: 30 },
  code: projectCode(),
  folderName: '',
  zip: true,
};

(({ clean }) => {
  if (clean) deleteFolderSync(''); // clean the output folder

  console.log('Generating CSV...', advConfig);
  return generateAdvanced(advConfig);
})({ clean: true });
