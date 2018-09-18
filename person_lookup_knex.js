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
const argv = process.argv.slice(2);

//knex.select('*').from('famous_people').where()
console.log("Searching ...");
knex('famous_people').where('first_name', argv[0]).asCallback(function(err, rows) {
      if (err){
        return console.error(err);
      }
      console.log(`Found ${rows.length} person(s) by the name '${argv[0]}'`);
      let counter = 0 ;
      rows.forEach(function(row){
          let date = new Date(row.birthdate);
          let birthdate = (moment(date).format("YYYY-MM-DD"));
          counter++;
          console.log(`${counter}: ${row.first_name} ${row.last_name},born '${birthdate}'`);
        });

      knex.destroy();
    });;

