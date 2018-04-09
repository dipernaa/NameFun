const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, '/names');

const readdir = (directoryPath) => (
  new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  })
);

const readFile = (filePath) => (
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve({
        data,
        file: filePath
      });
    });
  })
);

const saveData = (saveFn) => (
  readdir(directoryPath)
    .then((files) => {
      const filePromises = files.map((currentFile) => readFile(`${directoryPath}/${currentFile}`));
      return Promise.all(filePromises);
    })
    .then((fileResults) => {
      const finalPromise = fileResults.reduce((previousPromise, currentFileResult) => (
        previousPromise
          .then(() => {
            console.log('current file:', currentFileResult.file);

            const fileName = currentFileResult.file;
            const year = fileName.substring(fileName.lastIndexOf('yob') + 3, fileName.indexOf('.txt'));
            const nameLines = currentFileResult.data.toString().split('\n').filter((currentLine) => (
              currentLine && currentLine.length
            ));

            return saveFn(nameLines, year);
          })
      ), Promise.resolve());

      return finalPromise;
    })
);

module.exports = {
  readdir,
  readFile,
  saveData
};
