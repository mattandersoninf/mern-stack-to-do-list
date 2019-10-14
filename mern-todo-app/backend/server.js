// Server.js //

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

let Todo = require('./todo.model');


// Tell the server to use the cors library
app.use(cors());
// Tell the server to use the bodyParser library with the format for JSON objects
app.use(bodyParser.json())

// Set up the connection to the mongodb server 
// "mongodb://127.0.0.1:27017/todos" is the default mongo path
mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser:true});
const connection = mongoose.connection;

// Do a one time console log so that you know that you're server is set up
connection.once('open',function(){
    console.log("MongoDB database connection established successfully!");
})


// Endpoint which is grabbing all available todos items, you feed your function a request argument and a result argument
todoRoutes.route('/').get(function(req,res){
    // Here is your error handling    
    Todo.find(function(err,todos){
        if(err){
            // if an error has occured, log it in the console
            console.log(err);
        }else{
            // grab your results in json form
            res.json(todos);
        }
    
    });
});

// Endpoint used to get a todo item by referencing the todo item's id
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// Endpoint used to add new todo items by sending an HTTP Post request, the HTTP POST request body so you need to use 'req.body' to see the contents
todoRoutes.route('/add').post(function(req, res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo':'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed!');
        })
})

// Endpoint used to update a todo item
todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        // if you're searching for a todo item id that does not exist, throw back an error status
        if (!todo){
            res.status(400).send("data is not found");
        }
        // if you find the id that you're looking for, update the data associated with this id with your request 
        // primarily to change a todo item from 'not completed' to 'completed'
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
        }
        // save the newly updated todo item to the server and notify the user that the deed has been done
        todo.save().then(todo => {
            res.json('Todo updated!');
        })

        // something has gone wrong in trying to update this todo item so notify the user
        .catch(err => {
            res.status(400).send("Update not possible!");
        })
    })
})

// Endpoint used for deleting todo items
todoRoutes.route('/:id').delete((req, res) =>{
    Todo.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Todo item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Tell the server to use the express router
app.use('/todos', todoRoutes);

// Have node server setup on the port object from above and return the string that says what port it is established on
app.listen(PORT, function(){
    console.log("Server is running on port: " + PORT)
})

