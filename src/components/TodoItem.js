import React from 'react';

// initial functional behaviour of the component
// function TodoItem(props) {
//     return(<div className="todo-item">
//                 <input type="checkbox" checked={props.item.completed}/>
//                 <label>{props.item.title}</label>
//     </div>);
// }

class TodoItem extends React.Component {
    //The onChange makes sure to call a callback function that executes the toggler method, that was passed as a prop to each individual todoItem, passing down the id of the Item that called it.
    render() {
        return (<div className="todo-item">
                <input type="checkbox" checked={this.props.item.completed} onChange={(event) => this.props.toggler(this.props.item.id)} />
                <label style={this.props.item.completed ? {textDecoration: "line-through", color: "grey", fontStyle: "italic"}: null}>{this.props.item.title}</label>
                <button className="deleter" onClick={(event) => this.props.deleter(this.props.item.id)}>X</button>
        </div>);
    }
}

export default TodoItem;