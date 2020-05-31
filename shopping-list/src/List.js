import React, { Component } from 'react';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {contents:["Carat", "Bean"]}
        

    }

    addItemToContents(item) {
        this.setState((state) => ({
            contents: state.contents.concat(item)
        }))
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
            <button onClick={this.addItemToContents()}>Add</button>
        </div>
    )}
}


export default List;
