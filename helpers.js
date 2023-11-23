const { DateTime: DT } = require('luxon');

const time = DT.local().toFormat('MMMdd_HHmm');

const fileNameFn = (filename, folder) => {
  const name = [folder, time, filename].filter(Boolean).join(' ');
  console.log([folder, time, filename]);
  return `${name}.csv`;
};

module.exports = {
  fileNameFn,
  time,
};
