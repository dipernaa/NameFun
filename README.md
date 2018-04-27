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
Run a `fun.js` file using node. It takes `name` and `sex` as search parameters and returns simple analysis on names with the `name` and `sex` inputted.
```
➜  mysql git:(master) node fun.js
prompt: name:  Tony
prompt: sex:  M


Total: 247966
Most Occurances in a Year: 8296 in 1961
All Done!
```
