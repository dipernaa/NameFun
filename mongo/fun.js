const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Name } = require('./models');
const { getNameFromPrompt, runAnalysis } = require('../util');

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

getNameFromPrompt()
  .then((promptResults) => getNamesByName(promptResults.name, promptResults.sex))
  .then(runAnalysis)
  .then(() => {
    console.log('All Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('ERROR');
    console.log(err);
    process.exit(1);
  });
