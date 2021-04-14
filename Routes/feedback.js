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
    console.log('connected!!');
})

function createTable() {
    con.query('SELECT * FROM feedback', function(err, result, fields){
        if(err){
            const sql = 'CREATE TABLE feedback (id INT AUTO_INCREMENT PRIMARY KEY, body VARCHAR(255) , stars INT )'
            con.query(sql, function(err, result){
                if(err) throw err
            });
        }
    })
}

createTable();

router.post('/Feedback', async (req, res)=> {

    const body = req.body.body;
    const stars = req.body.stars;
   
            var sql = `INSERT INTO feedback (body, stars) VALUES ('${body}', '${stars}')`;        
            con.query(sql ,function (err, result) {
                res.status(200).send("OK");
            if (err) {
            throw err;
        } 
         
    });  
});

router.get('/GETFEED', async (req, res)=> {

    const thesql = `Select * FROM feedback `;
    con.query(thesql,  function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send({ result })
    });  
});

module.exports = router;
