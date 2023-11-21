const { startCase, get } = require('lodash');
const { stringify } = require('csv-stringify');
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

const csv = (opts) => (raw) => {
  // const BOM = String.fromCharCode(0xfeff);
  const { mapping, filename = 'data.csv', folderName = '' } = opts;

  const data = raw.map((r) => csvRow(mapping, r));

  const stringifier = stringify({
    header: true,
    columns: csvHeader(mapping),
  });

  stringifier.on('error', (err) => {
    console.error(err.message);
  });

  data.forEach((d) => stringifier.write(d));
  // write to file

  const location = path.resolve(__dirname, 'output', folderName, filename);
  fs.mkdirSync(path.dirname(location), { recursive: true });

  stringifier.pipe(fs.createWriteStream(location));
};

module.exports = csv;
