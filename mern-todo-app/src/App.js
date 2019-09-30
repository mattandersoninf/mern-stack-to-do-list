import React, {Component} from 'react';
// import Router
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component{
  render(){
    return (
      // The router element allows you to navigate other views as the user performs application tasks
      // The <Route> elements will point to component files. The App calls the component files and the component files cutomize the components as needed/written
      <Router>
        <div className="container">
          <h2>MERN-Stack Todo App</h2>
        </div>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </Router>
    );
  }
}

export default App;
