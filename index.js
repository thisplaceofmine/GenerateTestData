const { faker } = require('@faker-js/faker');

const { generateAdvanced } = require('./generateCSV');
const { deleteFolderSync } = require('./zipFolder');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`;

const advConfig = {
  car: { quota: 900, total: 900 },
  motorcycle: { quota: 900, total: 900 },
  taxi: { quota: 900, total: 900 },
  code: projectCode(),
  folderName: '',
  zip: false,
};

(({ clean }) => {
  if (clean) deleteFolderSync(''); // clean the output folder

  console.log('Generating CSV...', advConfig);
  return generateAdvanced(advConfig);
})({ clean: true });
