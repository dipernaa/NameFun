const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const directoryPath = path.join(__dirname, '/names');

const getNameFromPrompt = () => (
  new Promise((resolve, reject) => {
    prompt.start();

    prompt.get(['name', 'sex'], (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  })
);

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

const runAnalysis = (results = []) => {
  let total = 0;
  const highest = {
    amount: 0,
    year: 0
  };

  results.forEach((currentRow) => {
    total += currentRow.amount;

    if (currentRow.amount > highest.amount) {
      highest.amount = currentRow.amount;
      highest.year = currentRow.year;
    }
  });

  console.log('\n');
  console.log('Total:', total);
  console.log('Most Occurances in a Year:', `${highest.amount} in ${highest.year}`);
};

const saveData = (saveFn) => (
  readdir(directoryPath)
    .then((files) => {
      const filePromises = files.map((currentFile) => readFile(`${directoryPath}/${currentFile}`));
      return Promise.all(filePromises);
    })
    .then((fileResults) => {
      const startTime = Date.now();
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

      return finalPromise
        .then(() => {
          console.log('Total Time to Insert:', `${(Date.now() - startTime) / 1000} s`);
        });
    })
);

module.exports = {
  getNameFromPrompt,
  readdir,
  readFile,
  runAnalysis,
  saveData
};
