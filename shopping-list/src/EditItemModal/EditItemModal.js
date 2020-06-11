import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
        )
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
                    <Form.Row>
                            <Col><Form.Label>Name</Form.Label></Col>
                            <Col><Form.Control type="text" placeholder="Name" value={this.state.name} onChange={this.changeName}/></Col>
                        </Form.Row>
                        <Form.Row>
                            <Col><Form.Label>Notes</Form.Label></Col>
                            <Col><Form.Control type="text" placeholder="Notes" value={this.state.notes} onChange={this.changeNotes}/></Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.hideModal}>Cancel</Button>
                    <Button variant="success" onClick={this.editItem}>Edit Item</Button>
                </Modal.Footer>
        </Modal>)
    }
}

export default EditItemModal