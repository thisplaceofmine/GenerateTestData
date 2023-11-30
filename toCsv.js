/* eslint-disable import/no-unresolved */
const { startCase, get } = require('lodash');
const { stringify } = require('csv-stringify/sync');
const fs = require('fs');
const path = require('path');

function csvRow(mapping, data) {
  return mapping.map((m) => {
    const k = m.key;
    let v = get(data, k);

    if (m.getter) v = m.getter(v, data);

    return v !== undefined && v !== null ? String(v) : '';
  });
}

function csvHeader(mapping) {
  return mapping.map(({ key, label }) => label || startCase(key));
}

const csv = (opts) => async (raw) => new Promise((resolve, reject) => {
  try {
    const { mapping, filename = 'data.csv', folder = '' } = opts;

    const data = raw.map((r) => csvRow(mapping, r));

    const location = path.resolve(__dirname, 'output', folder, filename);
    fs.mkdirSync(path.dirname(location), { recursive: true });

    fs.writeFileSync(
      location,
      stringify(data, { header: true, columns: csvHeader(mapping) }),
    );
    resolve();
  } catch (e) {
    reject(e);
  }
});

module.exports = csv;
