import React, { Component } from 'react';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contents:[],
            addValue: ""
        }
        this.addItemToContents = this.addItemToContents.bind(this);
        this.handleAddTextChange = this.handleAddTextChange.bind(this);

    }

    addItemToContents(event) {
        // call api to save item
        this.setState({contents: this.state.contents.concat(this.state.addValue)})
        event.preventDefault()
        this.setState({addValue: ""})
    }

    handleAddTextChange(event) {
        this.setState({addValue: event.target.value})
    }

    render() {
        return (
        <div className="list">

            <h2>{this.props.type}</h2>
            <ul>
                {this.state.contents.map(item => 
                    <li>{item}</li>
                )}
            </ul>
            <form onSubmit={this.addItemToContents} className="addItemForm">
                <input type="text" value={this.state.addValue} onChange={this.handleAddTextChange}/>
                <input type="submit"/>
            </form>
        </div>
    )}
}


export default List;
