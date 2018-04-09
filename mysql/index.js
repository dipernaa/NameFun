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
    .catch(() => {
      console.log('initial setup of database');
    })
    .then(() => query(connection, { sql: queries.database.create }))
    .then(() => query(connection, { sql: queries.database.use }))
    .then(() => query(connection, { sql: queries.tables.names }))
    .then(() => query(connection, { sql: queries.tables.nameAmounts }))
    .then(() => {
      console.log('database successfully setup');
    })
);

const insertData = (nameLines, year) => {
  const finalNamePromise = nameLines.reduce((previousNamePromise, currentLine) => (
    previousNamePromise
      .then(() => {
        const [name, sex, amount] = currentLine.split(',');

        return query(connection, {
          sql:
            `INSERT INTO ${tables.names.name}
            (name, sex)
            VALUES (?, ?)`,
          values: [name, sex]
        })
        .catch(() => { /* Duplicate Name */ })
        .then(() => (
          query(connection, {
            sql:
              `INSERT INTO ${tables.nameAmounts.name}
              (name_id, amount, year)
              VALUES ((
                SELECT id
                FROM \`${tables.names.name}\`
                WHERE name = ?
                AND sex = ?
                LIMIT 1
              ), ?, ?)`,
            values: [name, sex, amount, year]
          })
        ));
      })
  ), Promise.resolve());

  return finalNamePromise;
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

