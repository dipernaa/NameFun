const dotenv = require('dotenv');
const prompt = require('prompt');
const mongoose = require('mongoose');
const { Name } = require('./models');

dotenv.load();
mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/nameFun`);

const getNamesByName = (name, sex) => (
  new Promise((resolve, reject) => {
    Name.find({ name, sex }).select('amount name sex year').exec((err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  })
);

const getNameFromPrompt = () => (
  new Promise((resolve, reject) => {
    prompt.get(['name', 'sex'], (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  })
);

prompt.start();

getNameFromPrompt()
  .then((promptResults) => getNamesByName(promptResults.name, promptResults.sex))
  .then((results) => {
    console.log(results);
  })
  .then(() => {
    console.log('All Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('ERROR');
    console.log(err);
    process.exit(1);
  });
