import React, {Component} from 'react';
// These elements allows the ability to grab information from the server
import {Link} from 'react-router-dom';
import axios from 'axios';

// Page where you can edit the todo items
// https://www.youtube.com/watch?v=7CqJlxBYj-M&t=903s
const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link> | <button onClick={() => {props.deleteTodoItem(props.todo._id)}}>Delete</button>
        </td>
    </tr>
)


export default class TodosList extends Component{
    // class constructor
    // initialize an empty array
    constructor(props){
        super(props);
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.state = {todos:[]};
    }


    // called once the component is mounted
    componentDidMount(){
        // send the function that gets all of the todo items currently in the database
        axios.get('http://localhost:4000/todos/')
            // fill the empty array with all of the todo items stored in the server
            .then(response => {
                this.setState({todos:response.data})
            })
            // error handling
            .catch(function(error){
                console.log(error);
            })
    }
    

    deleteTodoItem(id){
        console.log(id);
        axios.delete('http://localhost:4000/todos/'+id)
            .then(res => {console.log(res.data)});
            
        this.setState({
            todos :this.state.todos.filter(el => el._id !== id)
        })
    }

    /*
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)});

        this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    */

    todoList(){
        return this.state.todos.map(function(currentTodo,i){
            return <Todo todo={currentTodo} key={i} deleteTodoItem={this.deleteTodoItem}/>;
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