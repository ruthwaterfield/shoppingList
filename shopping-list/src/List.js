import React, { Component } from 'react'
import './List.css'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Col from 'react-bootstrap/Col'
import ProcessIngredientsModal from './ProcessIngredientsModal'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contents:[],
            addValue: "",
            showModal: false,
            toProcessFromServer: ["Beans", "More Beans", "Lemons"]
        }
        this.addNewItemToContents = this.addNewItemToContents.bind(this)
        this.addItemToContents = this.addItemToContents.bind(this)

        this.handleAddTextChange = this.handleAddTextChange.bind(this)

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    showModal() { this.setState({showModal: true}) }
    hideModal() { this.setState({showModal: false}) }

    addItemToContents(items) {
        this.setState({contents: this.state.contents.concat(items)})
    }

    addNewItemToContents(event) {
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
            <div className="topRow">
                <h2>{this.props.type}</h2>
                <Button onClick={this.showModal} variant="secondary" size="sm">
                    Process List
                </Button>
            </div>
            <ul>
                {this.state.contents.map(item => 
                    <li>{item}</li>
                )}
            </ul>

            <Form onSubmit={this.addNewItemToContents} className="ingredientForm">
                <Form.Control type="text" value={this.state.addValue} onChange={this.handleAddTextChange}/>
                <Button type="submit">Submit</Button>
            </Form>

            <ProcessIngredientsModal 
                show={this.state.showModal}
                hideModal={this.hideModal}
                type={this.props.type}
                processList={this.state.toProcessFromServer}
                addItemToCurrentList={this.addItemToContents}
            />
        </div>
    )}
}


export default List;
