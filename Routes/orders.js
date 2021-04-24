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
    con.query('SELECT * FROM orders', function(err, result, fields){
        if(err){
            const sql = 'CREATE TABLE orders (id INT PRIMARY KEY, address VARCHAR(255) Not Null, delivery VARCHAR(255) Not Null, name VARCHAR(255) Not Null, phone INT Not Null, price INT Not Null, item VARCHAR(255) )'
            con.query(sql, function(err, result){
                if(err) throw err
            });
        }
    })
}

createTable();

router.post('/ORDER', async (req, res)=> {
console.log(req.body.name);
    const item = req.body.item;
    const name = req.body.name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const price = req.body.price;
    const delivery = req.body.delivery;
    const userId = req.body.userId;

            var sql = `INSERT INTO orders (id, address, delivery, name, phone, price, item) VALUES ('${userId}', '${address}', '${delivery}', '${name}', '${phone_number}', '${price}', '${item}')`;        
            con.query(sql ,function (err, result) {
                res.status(200).send("OK");
            if (err) {
            throw err;
        } 
         
    });  
});

router.get('/GETORDERS', async (req, res)=> {

    const id = req.headers['id'];

    const thesql = `SELECT * FROM orders WHERE id = '${id}'`;
    con.query(thesql,  function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send({ result })
      console.log(req.headers['id']);
    });  
});

module.exports = router;
