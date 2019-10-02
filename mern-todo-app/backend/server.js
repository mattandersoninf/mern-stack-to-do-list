// Server.js

// Express objject set up
const express = require('express');
const app = express();
// Body-Parser object
const bodyParser = require('body-parser');
// CORS object
const cors = require('cors');
// Server port to access the node database
const PORT = 4000;

// Tell express to use the cors package
app.use(cors());
// Tell express to use the bodyParser witht the format for JSON objects
app.use(bodyParser.json())

// Have node server setup on the port object from above and return the string that says what port it is established on
app.listen(PORT, function(){
    console.log("Server is running on port: " + PORT)
})

