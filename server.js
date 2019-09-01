const express = require('express');
const hbs = require('hbs');
// const bodyParser=require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const cors = require("cors");



const port =process.env.PORT || 3000;

var app = express();
// app.use(cors());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);



app.get('/', (req,res) => {
    res.render('index.hbs');
});






app.listen(port, () => {
    console.log('Server is up at port ' + port);
});
