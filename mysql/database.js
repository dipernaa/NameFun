const databaseName = 'name_fun';

const tables = {
  names: {
    name: 'names',
    select: (alias) => (
      `${alias}.id, ${alias}.name, ${alias}.sex, ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  },
  nameAmounts: {
    name: 'name_amounts',
    select: (alias) => (
      `${alias}.id, ${alias}.name_id as nameId, ${alias}.amount, ${alias}.year,
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
        \`name\` VARCHAR(64),
        \`sex\` CHAR(1) NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`name_sex_UNIQUE\` (\`name\`, \`sex\` ASC)
      )`,
    nameAmounts:
      `CREATE TABLE \`${databaseName}\`.\`${tables.nameAmounts.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`name_id\` INT UNSIGNED NOT NULL,
        \`amount\` INT UNSIGNED NOT NULL,
        \`year\` CHAR(4) NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`name_id\`) REFERENCES \`${tables.names.name}\`(\`id\`) ON DELETE CASCADE
      )`
  }
};

module.exports = {
  databaseName,
  queries,
  tables
};
