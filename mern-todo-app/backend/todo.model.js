const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// DO NOT FORGET TO PUT IN THE COMMA'S AFTER THE VALUES
// The schema make up is as follows: at first glance, it is comparable to a single MySQL table
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

// Establish a mongoose model that you can create, read, update, delete, and store data from based on teh schema written above
module.exports = mongoose.model('Todo', Todo);
