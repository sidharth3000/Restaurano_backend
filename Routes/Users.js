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
    console.log('connected!');
})

function createTable() {
    con.query('SELECT * FROM users', function(err, result, fields){
        if(err){
            const sql = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, password VARCHAR(255) Not Null, email VARCHAR(255) Not Null UNIQUE)'
            con.query(sql, function(err, result){
                if(err) throw err
            });
        }
    })
}

createTable();

router.post('/Register', async (req, res)=> {

    const email = req.body.email;
    const pass = req.body.password;
     
    con.query(`SELECT * FROM users WHERE email = '${email}' `, function (err, result) {
        if (err) {
            res.send({err:'err'})
        } 
        if(result.length  === 0){
            var sql = `INSERT INTO users (email, password) VALUES ('${email}', '${pass}')`;        
            con.query(sql ,function (err, result) {
            if (err) {
            throw err;
            } 
            
            con.query(`SELECT * FROM users WHERE email = '${email}' AND  password = '${pass}' `,
                async function (err, result) {
                    if(result.length  !== 0 ){
                    jwt.sign({ UserEmail: email }, jwtPrivateSecret ,
                    (err, token) => {         
                        res.send({token:token, result});
                    });
                    }
                    if(result.length  === 0){
                    res.send({message:'error not found'});
                    console.log('err', err)
                    }
                });  
             });
             
           }
          else {
             return res.status(201).send({ message:'this email aleady taken befoer' })
          }
      });  
    });

module.exports = router;

const jwtPrivateSecret = "SidharthSaini49";

router.post('/Login', async (req, res)=> {

    const email = req.body.email;
    const pass = req.body.password;
    console.log(email,pass)
    con.query(`SELECT * FROM users WHERE email = '${email}' AND  password = '${pass}' `,
    async function (err, result) {
        // console.log(result[0].id)
        if(result.length  !== 0 ){
          jwt.sign({ UserEmail: email }, jwtPrivateSecret ,
          (err, token) => {         
              res.send({token:token, id:result[0].id, error: "f" });
          });
        }
        if(result.length  === 0){
          res.send({message:'error not found', error: "t"});
          console.log('err', err)
        }
       });  
  
     });