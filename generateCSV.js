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

const generateAdvanced = (config) => {
  const {
    motorcycle, taxi, car, fileKey: folderName,
  } = config;
  const masterData = [];

  Object.entries({ motorcycle, taxi, car })
    .filter(([, val]) => val)
    .map(([type, { quota, total }]) => {
      const data = generateAdvancedData({ quota, total, type });
      masterData.push(...data);
      return { type, successful: data.slice(0, quota), backup: data.slice(quota) };
    })
    .forEach(({ type, successful, backup }) => {
      toCsv({
        mapping: application,
        folderName,
        filename: fileNameFn(`${type.toUpperCase()} Successful_List`, config),
      })(successful);
      toCsv({
        mapping: application,
        folderName,
        filename: fileNameFn(`${type.toUpperCase()} Backup_List`, config),
      })(backup);
    });

  toCsv({
    mapping: masterList,
    folderName,
    filename: fileNameFn('Master_List', config),
  })(masterData);
};

module.exports = {
  generateSimple,
  generateAdvanced,
};
