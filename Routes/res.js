const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'restaurano'
})

con.connect(function(err){
    if(err) throw err;
    console.log('connected!!!');
})

function createTable() {
    con.query('SELECT * FROM res', function(err, result, fields){
        if(err){
            const sql = 'CREATE TABLE res (id INT , date INT ,  members INT )'
            con.query(sql, function(err, result){
                if(err) throw err
            });
        }
    })
}

createTable();

router.post('/RES', async (req, res)=> {
console.log(req.body.name);
   
    const date = req.body.date;
    const members = req.body.members;
    const userId = req.body.userId;

    console.log(date);

            var sql = `INSERT INTO res (id, date, members) VALUES ('${userId}', '${date}', '${members}')`;        
            con.query(sql ,function (err, result) {
                res.status(200).send("OK");
            if (err) {
            throw err;
        } 
         
    });  
});

router.get('/GETRES', async (req, res)=> {

    const id = req.headers['id'];

    const thesql = `SELECT * FROM res WHERE id = '${id}'`;
    con.query(thesql,  function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send({ result })
    //   console.log(req.headers['id']);
    });  
});

module.exports = router;
