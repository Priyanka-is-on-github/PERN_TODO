 const Pool = require("pg").Pool;
 const pool = new Pool({
    user:'postgres',
    password:'priyanka@8888',
    host:'localhost',
    port:5432, 
    database:'perntodo_db'
 })
module.exports = pool;