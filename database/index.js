const mysql = require("mysql2")
const util = require("util")

const db = mysql.createConnection({
    host:"bux25htrbuqctwyrtt9q-mysql.services.clever-cloud.com",
    user:"u2erouxzvl16egut",
    password:"uxghzQ7L8nfmceIrTTJv",
    database:"bux25htrbuqctwyrtt9q",
    port : 3306,
})

db.connect((err)=>{
    if (err){
        return console.error(`error: ${err.message}`)
    }
    console.log("Connected to mysql server")
})

const query = util.promisify(db.query).bind(db)
module.exports = {db, query}