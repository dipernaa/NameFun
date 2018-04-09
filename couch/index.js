const dotenv = require('dotenv');
const PouchDB = require('pouchdb');
const { saveData } = require('../util');

dotenv.load();
const couchdb = new PouchDB(`http://${process.env.COUCH_DB_HOST}:${process.env.COUCH_DB_PORT}/name-fun`);

const insertData = (nameLines, year) => {
  const namesToInsert = nameLines.map((currentLine) => {
    const [name, sex, amount] = currentLine.split(',');

    return {
      amount: Number(amount),
      name,
      sex,
      year: Number(year)
    };
  });

  return couchdb.bulkDocs(namesToInsert);
};

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
