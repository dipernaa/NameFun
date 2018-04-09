const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { saveData } = require('../util');
const { Name } = require('./models');

dotenv.load();
mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/nameFun`);

const insertData = (nameLines, year) => (
  new Promise((resolve, reject) => {
    const namesToInsert = nameLines.map((currentLine) => {
      const [name, sex, amount] = currentLine.split(',');

      return new Name({ amount, name, sex, year });
    });

    Name.collection.insert(namesToInsert, (err, newNames) => {
      if (err) {
        return reject(err);
      }

      resolve(newNames);
    });
  })
);

saveData(insertData)
  .then(() => {
    console.log('All Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('ERROR');
    console.log(err);
    process.exit(1);
  });
