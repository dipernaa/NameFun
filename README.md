# NameFun
Fun with baby name info from SSA. Each database folder loads the baby name in a different type of database.

## Running Locally
### Install Dependencies
```
yarn
```

### Set Up .env Files
In each of the database folders
```
cp .env.sample .env
# replace placeholders with real values
```

### Seed Data
In each of the database folders
```
node index.js
```

## Fun with Data
Mongo is the only database with a script written to search seeded data. It takes `name` and `sex` as search parameters and returns every object that contains the `name` and `sex inputted.
```
➜  mongo git:(master) ✗ node fun.js
prompt: name:  Tony
prompt: sex:  M
[ { _id: 5acb9d746a0aae769f39660a,
    amount: 42,
    name: 'Tony',
    sex: 'M',
    year: '1880' },
    ...
]
```
