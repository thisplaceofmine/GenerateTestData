const { DateTime: DT } = require('luxon');

const time = DT.local().toFormat('MMMdd_HHmm');

const fileNameFn = (filename, baseConfig) => {
  const name = [baseConfig.fileKey, time, filename].filter(Boolean).join(' ');
  return `${name}.csv`;
};

module.exports = {
  fileNameFn,
  time,
};
