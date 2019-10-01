import React, {Component} from 'react';
// import Router
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// import the create-todo, edit-todo, and todos-list component files
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

// import the logo png file
import logo from './logo-og.png';

class App extends Component{
  render(){
    return (
      // The router element allows you to navigate other views as the user performs application tasks
      // The <Route> elements will point to component files. The App calls the component files and the component files cutomize the components as needed/written
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              {/* The "logo" img is being referenced to the logo.svg file */}
              <img src={logo} width="55" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-link">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="nav-link">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
