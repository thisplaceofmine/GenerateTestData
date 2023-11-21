const { generateSimple, generateAdvanced } = require('./generateCSV');

const baseConfig = {
  total: 20,
  quota: 6,
  fileKey: '6 to 20',
};

const advConfig = {
  fileKey: 'M5-25 T6-30 C7-35',
  motorcycle: { quota: 5, total: 25 },
  taxi: { quota: 6, total: 30 },
  car: { quota: 7, total: 35 },
};

((advance = false) => {
  if (!advance) return generateSimple(baseConfig);
  return generateAdvanced(advConfig);
})(true);
