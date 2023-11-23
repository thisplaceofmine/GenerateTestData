const { DateTime: DT } = require('luxon');

const time = DT.local().toFormat('MMMdd_HHmm');

const fileNameFn = (filename, baseConfig) => {
  const { folder } = baseConfig;
  const name = [folder, time, filename].filter(Boolean).join(' ');
  return `${name}.csv`;
};

module.exports = {
  fileNameFn,
  time,
};
