import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import baseUrl from '../baseurl'

class ProcessIngredientsModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needToProcess: false
        }
        
        this.editItem = this.editItem.bind(this)
        this.requireItem = this.requireItem.bind(this)
        this.notRequireItem = this.notRequireItem.bind(this)
        this.nextItem = this.nextItem.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.show &&
            !prevProps.show &&
            this.props.processList.length > 0) {
            this.setState({
                currentItemPosition: 0,
                currentItem: this.props.processList[0],
                currentNotes: "",
                needToProcess: true
            })
        }
    }

    requireItem() {
        this.editItem(true)
    }

    notRequireItem() {
        this.editItem(false)
    }

    editItem(required) {
        axios.post(baseUrl + '/listitem/edit/' + this.state.currentItem.id, {
            name: this.state.currentItem.name,
            section: this.state.currentItem.section,
            required: required,
            notes: this.state.currentNotes
        }).then(response => {
            this.setState({
                currentNotes: ""
            })
            this.nextItem()
        })
    }

    nextItem() {
        if (this.state.currentItemPosition < this.props.processList.length - 1) {
            this.setState({
                currentItemPosition: this.state.currentItemPosition + 1,
                currentItem: this.props.processList[this.state.currentItemPosition + 1]
            })
        } else {
            this.setState({needToProcess: false})
        }
    }

    changeNotes(event) {
        this.setState({currentNotes: event.target.value})
    }

    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.hideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Processing {this.props.section} List</Modal.Title>
            </Modal.Header>
            {this.state.needToProcess ?
            <div>
                <Modal.Body>
                    <h2>Item: <strong>{this.state.currentItem.name}</strong></h2>
                    <Form className="processItemForm">
                        <Form.Row>
                            <Col><Form.Label>Notes</Form.Label></Col>
                            <Col><Form.Control type="text" placeholder="Notes" value={this.state.currentNotes} onChange={this.changeNotes}/></Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.notRequireItem}>No, ta</Button>
                    <Button variant="success" onClick={this.requireItem}>Yes pls</Button>
                </Modal.Footer>
            </div>
            :<div>
                <Modal.Body>
                    <div>Nothing to process- all done!</div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.hideModal}>Finished!</Button>
                </Modal.Footer>
            </div>}
        </Modal>)
    }
}

export default ProcessIngredientsModal