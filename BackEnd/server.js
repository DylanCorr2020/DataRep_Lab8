const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

//import mongosse itself
const mongoose = require('mongoose');


//used a connection string to connect to the database 
//created a password in string and named database 
//we need to define schema for this database 
const connectionString = 'mongodb+srv://admin:madowls@cluster0.mw3qb.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(connectionString,{useNewUrlParser: true});

//generated a schema 
//what our database is gonna look like
//used that schema to create a model
const Schema = mongoose.Schema;


//made a schema for our database 
//what data it will hold
//store them into documents 
//use schema to create a model for our database 
//use model to interact with database
var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});


//first param is the collection
//second is the schema
//everytime i want to work with a database
//refer to the movieModel
//allow us to write data to our database 
//we have connected our server to our database 
var MovieModel = mongoose.model("movie",movieSchema);

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);
    res.send('Data Sent to Server!')

    MovieModel.create({
        title:req.body.Title,
        year: req.body.Year,
        poster: req.body.Poster
    });

    //we need to send a response to tell the client the data was sent to the database 
    res.send('Item Added');
})

//in order for our server to talk  to our database we use mongoose 
//first we have to install mongoose js server 
//use command $ npm install mongoose --save
//this package will help us talk to our database



app.get('/api/movies', (req, res) => {
    // const movies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "World War Z",
    //         "Year": "2013",
    //         "imdbID": "tt0816711",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //     }, 
    //     {
    //         "Title": "War of the Worlds",
    //         "Year": "2005",
    //         "imdbID": "tt0407304",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
    //     }
    // ];

    //finds all documents in the database
    //find all records in database and send them back 
    MovieModel.find((err,data)=>{
        res.json(data);
    })

})

//will return a movie back from the database 
    
app.get('/api/movies/:id',(req,res) =>{
        console.log(req.params.id);

        MovieModel.findById(req.params.id,(err,data) => {
            res.json(data);
        })
    })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})