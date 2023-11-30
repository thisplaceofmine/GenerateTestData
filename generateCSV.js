const { pickBy } = require('lodash');

const { generateAdvancedData } = require('./generateData');
const toCsv = require('./toCsv');
const { masterList, application } = require('./const');
const { fileNameFn } = require('./helpers');
const { zipFolder } = require('./zipFolder');

const keyToShort = { car: 'C', motorcycle: 'M', taxi: 'T' };

const generateAdvanced = async (config) => {
  const {
    motorcycle, taxi, car, folder: folderName,
  } = config;
  const masterData = [];
  const instruction = pickBy({ car, motorcycle, taxi }, Boolean);

  const folder = folderName || Object.entries(instruction).map(
    ([key, val]) => `${keyToShort[key]}${val.quota}-${val.total}`,
  ).join(' ');

  const withData = Object.entries(instruction)
    .map(([type, conf]) => {
      const data = generateAdvancedData({
        type, ...conf, ...config,
      });
      masterData.push(...data);
      return { type, successful: data.slice(0, conf.quota), backup: data.slice(conf.quota) };
    });

  const promises = withData.map(async ({ type, successful, backup }) => {
    const success = fileNameFn(`${type.toUpperCase()} Successful_List`, folder);
    const back = fileNameFn(`${type.toUpperCase()} Backup_List`, folder);

    await toCsv({ mapping: application, folder, filename: success })(successful);
    await toCsv({ mapping: application, folder, filename: back })(backup);
  });
  await Promise.all(promises);

  const master = fileNameFn('Master_List', folder);
  await toCsv({ mapping: masterList, folder, filename: master })(masterData);

  const name = fileNameFn('', folder).slice(0, -4);
  if (config.zip) zipFolder(folder, name);
};

module.exports = {
  generateAdvanced,
};
