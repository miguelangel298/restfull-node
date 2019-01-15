const express = require('express');

// Create the database connection
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlDB = 'mongodb://localhost/bookAPI';

mongoose.connect(urlDB);
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + urlDB);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 


mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.port || 3000;
const bookRouter = require('./application/routes/bookRoute')();

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('welcome to my API');
});

app.listen(port, function() {
  console.log('Running on PORT:' + port);
}); 