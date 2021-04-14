const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Users = require('./Routes/Users');
const Feedback = require('./Routes/feedback');
const Orders = require('./Routes/orders');
const Res = require('./Routes/res');

const app = express();

app.use(cors({ origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'restaurano'
})

con.connect(function(err){
    if(err) throw err;
})

app.use('/api/users', Users);
app.use('/api/feed', Feedback);
app.use('/api/orders', Orders);
app.use('/api/res', Res);

const port = process.env.Port || 4000;

app.listen(port, ()=> console.log(`app listening on port ${port}`))