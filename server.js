const express = require('express');
const hbs = require('hbs');
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
require('dotenv/config');
var cookieParser = require('cookie-parser')

const port =process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);
app.use(cookieParser());

// console.log(process.env.MONGO_URI);

app.get('/', (req,res) => {
    res.render('index.hbs');
});
const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    //secure: true, // to force https (if you use it)
    maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
    signed: false // if you use the secret with cookieParser
  };

app.post('/search',(req,res)=>{
 res.render('result.hbs');
   
 });
app.get('/view',(req,res)=>{
     res.render('view.hbs');
       
});
app.post('/show',(req,res)=>{
    var id=req.body.number;
    res.cookie('test', id, cookieConfig);

});
app.get('/send',(req,res)=>{
    //  console.log(req.body.find);
    //  console.log(req.cookies);
    const signedCookies = req.signedCookies; // get signed cookies
    console.log('signed-cookies:', signedCookies);  

    const uri = process.env.MONGO_URI;
    MongoClient.connect(uri,{ useNewUrlParser: true }, (erro,client) => {
        if (erro){
            return console.log('Unable to connect', erro);
        };

        console.log('Connected sucessfully');
        const db = client.db('Foodie');
        db.collection('restaurants').find({city:"Vellore"}).toArray(function(erro, result) {
            if (erro) {
                console.log('Unable to add the weather data', erro);
            }
            res.json(result[signedCookies['test']]);
        });
        client.close();
        });
       
     });
app.get('/query',(req,res)=>{
    const uri = process.env.MONGO_URI;
    MongoClient.connect(uri,{ useNewUrlParser: true }, (erro,client) => {
        if (erro){
            return console.log('Unable to connect', erro);
        };

        console.log('Connected sucessfully');
        const db = client.db('Foodie');
        db.collection('restaurants').find({city:"Vellore"}).toArray(function(erro, result) {
            if (erro) {
                console.log('Unable to add the weather data', erro);
            }
            res.json(result);
        });
        client.close();
        });
        
       

 
   });
   

app.listen(port, () => {
    console.log('Server is up at port ' + port);
});
