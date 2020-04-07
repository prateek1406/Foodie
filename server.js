const express = require('express');
const hbs = require('hbs');
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
require('dotenv/config')



const port =process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);


// console.log(process.env.MONGO_URI);

app.get('/', (req,res) => {
    res.render('index.hbs');
});


// console.log(uri);
// const client = new MongoClient(uri, { useNewUrlParser: true  });
// client.connect(err => {
// //   const collection = client.db("foodie").collection("restaurants");
//  console.log("YEs");
//   // perform actions on the collection object

//   client.close();
// });


app.post('/search',(req,res)=>{
//  console.log(req.body.find);
 res.render('result.hbs');
   
 });

 app.get('/view',(req,res)=>{
    //  console.log(req.body.find);
     res.render('view.hbs');
       
     });
app.get('/show',(req,res)=>{
    console.log("dhsjdjks");
    console.log(req.body.username);
});

   app.get('/query',(req,res)=>{
    //    console.log(req.body.find);
    const uri = process.env.MONGO_URI;
    MongoClient.connect(uri,{ useNewUrlParser: true }, (erro,client) => {
        if (erro){
            return console.log('Unable to connect', erro);
        };

        console.log('Connected sucessfully');
        const db = client.db('Foodie');
        // var query = { city };
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
