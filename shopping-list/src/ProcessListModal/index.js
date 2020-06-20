import React, { Component, Fragment } from 'react'
import { Modal, Row, Col, Form, Button }  from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'

class ProcessListModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needToProcess: false
        }
        
        this.editItem = this.editItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)

        this.requireItem = this.requireItem.bind(this)
        this.notRequireItem = this.notRequireItem.bind(this)
        this.nextItem = this.nextItem.bind(this)

        this.changeName = this.changeName.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.show &&
            !prevProps.show &&
            this.props.processList.length > 0){
                const firstItem = this.props.processList[0]
            this.setState({
                currentItemPosition: 0,
                currentItem: firstItem,
                currentName: firstItem.name,
                currentNotes: firstItem.notes,
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
            name: this.state.currentName,
            section: this.state.currentItem.section,
            required: required,
            regular: this.state.currentItem.regular,
            temporary: this.state.currentItem.temporary,
            notes: this.state.currentNotes
        }).then(response => {
            this.nextItem()
        }).catch(error => {
            console.log(error)
        })
    }

    deleteItem() {
        axios.delete(baseUrl + '/listitem/' + this.state.currentItem.id).then(response => {
            this.nextItem()
        }).catch(error => {
            console.log(error)
        })
    }

    nextItem() {
        const nextItemPosition = this.state.currentItemPosition + 1
        if (nextItemPosition < this.props.processList.length) {
            const nextItem = this.props.processList[nextItemPosition]
            this.setState({
                currentItemPosition: nextItemPosition,
                currentItem: nextItem,
                currentName: nextItem.name,
                currentNotes: nextItem.notes
            })
        } else {
            this.setState({needToProcess: false})
        }
    }

    changeName(event) {
        this.setState({currentName: event.target.value})
    }

    changeNotes(event) {
        this.setState({currentNotes: event.target.value})
    }

    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.hideModal} centered="true" size="lg">
            {this.state.needToProcess ?
            <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Processing {this.props.section} - {this.state.currentName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="processItemForm">
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Item name" value={this.state.currentName} onChange={this.changeName}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Notes" value={this.state.currentNotes} onChange={this.changeNotes}/>
                        </Col>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mr-auto" variant="warning" onClick={this.deleteItem}>Delete Item Forever</Button>
                    <Button variant="danger" onClick={this.notRequireItem}>Not Today</Button>
                    <Button variant="success" onClick={this.requireItem}>Yes Please!</Button>
                </Modal.Footer>
            </Fragment>
            :<Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Processing {this.props.section}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Nothing to process- all done!</div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.hideModal}>Finished!</Button>
                </Modal.Footer>
            </Fragment>}
        </Modal>)
    }
}

export default ProcessListModal