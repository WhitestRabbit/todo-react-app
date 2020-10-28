import React from 'react';

class AddTodo extends React.Component {
    constructor(){
        super();
        this.state = {
            title : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return(
            <form onSubmit={this.onSubmit} style={{display: "flex"}}>
                <input type="text" name="title" placeholder="What to do..." style={{flex: "10", padding: "5px"}} onChange={this.onChange}></input>
                <input type="submit" value="Submit" style={{flex: "1"}}></input>
            </form>
        )
    }
}

export default AddTodo;