const dotenv = require('dotenv');
const prompt = require('prompt');
const mysql = require('mysql');
const { tables, queries } = require('./database');
const { getNameFromPrompt, runAnalysis } = require('../util');
const { query } = require('./util');

dotenv.load();
const connection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  timezone: 'UTC'
});

const getNamesByName = (name, sex) => (
  query(connection, {
    sql:
      `SELECT
      ${tables.names.select('namesTable')}
      FROM \`${tables.names.name}\` as namesTable
      WHERE namesTable.name = ?
      AND namesTable.sex = ?`,
    values: [name, sex]
  })
  .then((queryResult) => {
    connection.end();
    return queryResult;
  })
  .catch((err) => {
    connection.end();
    return Promise.reject(err);
  })
);

query(connection, { sql: queries.database.use })
  .then(getNameFromPrompt)
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
