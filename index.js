const { faker } = require('@faker-js/faker');

const { generateAdvanced } = require('./generateCSV');
const { deleteFolderSync } = require('./zipFolder');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`;

const advConfig = {
  car: { quota: 20, total: 50 },
  motorcycle: { quota: 20, total: 40 },
  taxi: { quota: 20, total: 60 },
  code: projectCode(),
  folderName: '',
  zip: true,
};

(({ clean }) => {
  if (clean) deleteFolderSync(''); // clean the output folder

  console.log('Generating CSV...', advConfig);
  return generateAdvanced(advConfig);
})({ clean: false });
