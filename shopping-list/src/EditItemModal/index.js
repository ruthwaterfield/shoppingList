import React, { Component } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'

class EditItemModal extends Component{
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            notes: ""
        }
        
        this.editItem = this.editItem.bind(this)

        this.changeName = this.changeName.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
    }

    componentDidMount() {
        this.setState({
            name: this.props.item.name,
            notes: this.props.item.notes
        })
    }

    editItem() {
        axios.post(baseUrl + '/listitem/edit/' + this.props.item.id, {
            name: this.state.name,
            section: this.props.item.section,
            required: this.props.item.required,
            notes: this.state.notes
        }).then(
            this.props.hideModal()
        ).catch(error => {
            console.log(error)
        })
    }

    changeName(event) {
        this.setState({name: event.target.value})
    }

    changeNotes(event) {
        this.setState({notes: event.target.value})
    }

    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.hideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editing {this.props.item.name}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form className="processItemForm">
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Item name" value={this.state.name} onChange={this.changeName}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Notes" value={this.state.notes} onChange={this.changeNotes}/>
                        </Col>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.hideModal}>Cancel</Button>
                    <Button variant="success" onClick={this.editItem}>Save</Button>
                </Modal.Footer>
        </Modal>)
    }
}

export default EditItemModal