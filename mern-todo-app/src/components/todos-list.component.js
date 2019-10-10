import React, {Component} from 'react';
// These elements allows the ability to grab information from the server
import {Link} from 'react-router-dom';
import axios from 'axios';

// Page where you can edit the todo items
const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td>
            <button type="submit">Delete</button>
        </td>
    </tr>
)


export default class TodosList extends Component{
    // class constructor
    // initialize an empty array
    constructor(props){
        super(props);
        this.state = {todos:[]}
    }


    // called once the component is mounted
    componentDidMount(){
        // send the function that gets all of the todo items currently in the database
        axios.get('http://localhost:4000/todos/')
            // fill the empty array with all of the todo items stored in the server
            .then(response => {
                this.setState({todos:response.data});
            })
            // error handling
            .catch(function(error){
                console.log(error);
            })
    }

    handleSubmit = event =>{
        event.preventDefault();
        axios.delete('http://localhost:4000/todos/'+this.props.todo._id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    todoList(){
        return this.state.todos.map(function(currentTodo,i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render(){
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}