const { faker } = require('@faker-js/faker');

const { generateAdvanced } = require('./generateCSV');
const { deleteFolderSync } = require('./zipFolder');

const projectCode = () => `0${faker.string.alphanumeric(3)}${faker.string.numeric(4)}`.toUpperCase();

const advConfig = {
  car: { quota: 10, total: 20 },
  motorcycle: { quota: 10, total: 20 },
  taxi: { quota: 10, total: 20 },
  code: projectCode(),
  folderName: '',
  outputLocation: '',
  zip: false,
};

(({ clean }) => {
  const overwrite = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    return { ...acc, [key]: JSON.parse(value) };
  }, {});
  if (clean) deleteFolderSync('', overwrite.outputLocation); // clean the output folder

  console.log('Generating CSV...', { ...advConfig, ...overwrite });
  return generateAdvanced({ ...advConfig, ...overwrite });
})({ clean: true });
