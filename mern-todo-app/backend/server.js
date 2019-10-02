// Server.js

// Express object set up and call express library
const express = require('express');
const app = express();
// Body-Parser object
const bodyParser = require('body-parser');
// call the cors library
const cors = require('cors');
// call the mongoose library
const mongoose = require('mongoose');
// Server port to access the node database
const PORT = 4000;
// connect the schema to your express router
const todoRoutes = express.Router();


// Tell the server to use the cors library
app.use(cors());
// Tell the server to use the bodyParser library with the format for JSON objects
app.use(bodyParser.json())
// Tell the server to use the express router (your middleware that will start taking control of request starting with path '/todos')
app.use('/todos', todoRoutes);


// Add an endpoint which is grabbing all available todos items, you feed your function a request argument and a result argument
todoRoutes.route('/').get(function(req,res){
    
    // Here is your error handling    
    todoRoutes.find(function(err,todos){

        if(err){
            // if an error has occured, log it in the console
            console.log(err);
        }else{
            // grab your results in json form
            res.json(todos);
        }
    
    });
});


// Add another endpoint used to get a todo item by feeding it an id
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});




// Set up the connection to the mongodb server 
// "mongodb://127.0.0.1:27017/todos" is the default mongo path
mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser:true});
const connection = mongoose.connection;

// Do a one time console log so that you know that you're server is set up
connection.once('open',function(){
    console.log("MongoDB database connection established successfully!");
})

// Have node server setup on the port object from above and return the string that says what port it is established on
app.listen(PORT, function(){
    console.log("Server is running on port: " + PORT)
})

