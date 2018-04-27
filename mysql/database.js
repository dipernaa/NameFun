const databaseName = 'name_fun';

const tables = {
  names: {
    name: 'names',
    select: (alias) => (
      `${alias}.id, ${alias}.amount, ${alias}.name, ${alias}.sex, ${alias}.year,
      ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  }
};

const queries = {
  database: {
    create: `CREATE DATABASE ${databaseName}`,
    drop: `DROP DATABASE ${databaseName}`,
    use: `USE ${databaseName}`
  },
  tables: {
    names:
      `CREATE TABLE \`${databaseName}\`.\`${tables.names.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`amount\` INT UNSIGNED NOT NULL,
        \`name\` VARCHAR(64),
        \`sex\` CHAR(1) NOT NULL,
        \`year\` CHAR(4) NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      )`
  }
};

module.exports = {
  databaseName,
  queries,
  tables
};
