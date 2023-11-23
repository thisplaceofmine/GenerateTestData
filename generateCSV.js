const { pickBy } = require('lodash');

const { generateSimpleData, generateAdvancedData } = require('./generateData');
const toCsv = require('./toCsv');
const { masterList, application } = require('./const');
const { fileNameFn } = require('./helpers');

const generateSimple = (config) => {
  const generatedTestData = generateSimpleData(config);
  toCsv({
    mapping: masterList,
    folderName: config.fileKey,
    filename: fileNameFn('Master_List', config),
  })(generatedTestData);

  const quota = generatedTestData.slice(0, config.quota);
  toCsv({
    mapping: application,
    folderName: config.fileKey,
    filename: fileNameFn('Successful_List', config),
  })(quota);

  const unsuccessful = generatedTestData.slice(config.quota);
  toCsv({
    mapping: application,
    folderName: config.fileKey,
    filename: fileNameFn('Backup_List', config),
  })(unsuccessful);
};

const keyToShort = { car: 'C', motorcycle: 'M', taxi: 'T' };

const generateAdvanced = (config) => {
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

  withData.forEach(({ type, successful, backup }) => {
    const success = fileNameFn(`${type.toUpperCase()} Successful_List`, config);
    const back = fileNameFn(`${type.toUpperCase()} Backup_List`, config);

    toCsv({ mapping: application, folder, filename: success })(successful);
    toCsv({ mapping: application, folder, filename: back })(backup);
  });

  const master = fileNameFn('Master_List', config);
  toCsv({ mapping: masterList, folder, filename: master })(masterData);
};

module.exports = {
  generateSimple,
  generateAdvanced,
};
