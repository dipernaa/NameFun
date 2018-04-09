const query = (connection, queryObj) => (
  new Promise((resolve, reject) => {
    connection.query(queryObj, (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  })
);

module.exports = {
  query
};
