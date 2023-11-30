const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const deleteFolderSync = (folderPath) => {
  console.log('Deleting folder...', folderPath);
  const folder = path.resolve(__dirname, 'output', folderPath);
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((file) => {
      const curPath = path.join(folder, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folder);
  }
};

const zipFolder = async (folderPath, zipName) => {
  console.log('Zipping for...', zipName);
  const folder = path.resolve(__dirname, 'output', folderPath);

  // zip the folder
  const filenames = fs.readdirSync(folder)
    .filter((file) => file.startsWith(zipName) && file.endsWith('.csv'));

  const zip = new JSZip();
  filenames.forEach((name) => {
    const file = path.resolve(__dirname, 'output', folderPath, name);
    if (!fs.existsSync(file)) return;
    const buffer = fs.readFileSync(file);
    zip.file(name, buffer);
  });

  zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
    fs.writeFileSync(path.resolve(__dirname, 'output', folderPath, `${zipName}.zip`), content);
    console.log('Zipping Done');
  });

  filenames.forEach((name) => {
    fs.unlinkSync(path.resolve(__dirname, 'output', folderPath, name));
  });
};

module.exports = { zipFolder, deleteFolderSync };
