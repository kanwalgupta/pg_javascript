const pg = require("pg");
const settings = require("./settings");
const moment = require('moment');

var knex = require('knex')({
  client:  'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});
const inputData = process.argv.slice(2);
var insertData = {first_name: inputData[0], last_name: inputData[1], birthdate: inputData[2]};

knex.insert(insertData).into('famous_people')
.finally(function() {
  knex.destroy();
});