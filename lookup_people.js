const pg = require("pg");
const settings = require("./settings");
const moment = require('moment');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const argv = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }else{
    console.log("Searching ...");
    fetchFamousPerson(argv[0]);
  }
  //id | first_name | last_name | birthdate
});
function fetchFamousPerson(f_name){
  client.query('SELECT first_name,last_name,birthdate FROM famous_people WHERE first_name = $1', [f_name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }else{
        console.log(`Found ${result.rows.length} person(s) by the name '${f_name}'`);
        let counter = 0 ;

        result.rows.forEach(function(row){
          let date = new Date(row.birthdate);
          let birthdate = (moment(date).format("YYYY-MM-DD"));
          counter++;
          console.log(`${counter}: ${row.first_name} ${row.last_name},born '${birthdate}'`);
        });
      }
      client.end();
  });
}