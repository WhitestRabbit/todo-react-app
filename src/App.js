import React from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import Axios from 'axios';

// initial functional behaviour of the component
// function App() {
//     const todoItems = todos.map(item => <TodoItem key = {item.id} item = {item} />);

//     return (<div className="todo-list">
//                 {todoItems}
//             </div>);
// }

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: []
        };
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(res => this.setState({
            todos: res.data
        }));
    }

    addTodo(title) {
        Axios.post("https://jsonplaceholder.typicode.com/todos", {
            title,
            completed: false
        })
        .then(res => {
            console.log(res.data);
            this.setState(prevState => {
                return {
                    todos: [...prevState.todos, res.data]
                }
            });
        });
    }

    deleteTodo(id) {
        Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => {
            this.setState(prevState => {
                const newTodos = prevState.todos.filter(todo => todo.id !== id);
                return {
                    todos: newTodos
                }
            });
        });
    }

    //Function that toggles the completed  status for todos. It calls setState for the entire App, which in turn firstly maps the todos array of the previous state and toggles the requested item completed or uncompleted, then passes the new array to the state we are setting. Remember, we are not modifying the state, we are setting a new state that simply used the previous state.
    toggleCompleted(id) {
        this.setState(prevState => {
            //execution of the code
            const newTodos = prevState.todos.map(todo => {
                if(todo.id === id) {
                    //Take notes! We are doing this because if we were to for example set the todo.completed to its reverse, we would be actually altering the prevState directly! Here, we are simply returning a new todo with the completed status that we want. That is proper usage of the map function too. We are using spread for the rest of the object properties that we wish to keep as they are.
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                //If no change needs to be made, the same todo will be returned in the new array.
                }
                return todo;
            });
            //Returning the object literal that will "update" the state
            return {
                todos: newTodos
            };
        });
    }

    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key = {item.id} item = {item} toggler = {this.toggleCompleted} deleter = {this.deleteTodo}/>);

        return (<div className="todo-list">
                    <AddTodo addTodo = {this.addTodo}/>
                    {todoItems}
                </div>);
    }
}

export default App;