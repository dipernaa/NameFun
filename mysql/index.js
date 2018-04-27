const dotenv = require('dotenv');
const mysql = require('mysql');
const { tables, queries } = require('./database');
const { saveData } = require('../util');
const { query } = require('./util');

dotenv.load();
const connection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  timezone: 'UTC'
});

const setupDatabase = (connection) => (
  query(connection, { sql: queries.database.drop })
    .catch((err) => {
      console.log('initial setup of database');
    })
    .then(() => query(connection, { sql: queries.database.create }))
    .then(() => query(connection, { sql: queries.database.use }))
    .then(() => query(connection, { sql: queries.tables.names }))
    .then(() => {
      console.log('database successfully setup');
    })
);

const insertData = (nameLines, year) => {
  const namesToInsert = nameLines.map((currentLine) => {
    const [name, sex, amount] = currentLine.split(',');

    return [amount, name, sex, year];
  });

  return query(connection, {
    sql:
      `INSERT INTO ${tables.names.name}
      (amount, name, sex, year)
      VALUES ?`,
    values: [namesToInsert]
  });
};

setupDatabase(connection)
  .then(() => saveData(insertData))
  .then(() => {
    connection.end();

    console.log('All Done!');
    process.exit(0);
  })
  .catch((err) => {
    connection.end();

    console.log('ERROR');
    console.log(err);
    process.exit(1);
  });

