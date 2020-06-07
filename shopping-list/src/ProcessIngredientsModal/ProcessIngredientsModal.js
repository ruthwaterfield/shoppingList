import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ProcessIngredientsModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            itemsToAdd: [],
            currentItem: 0,
            currentComment: ""
        }
        
        this.saveList = this.saveList.bind(this)
        this.addItem = this.addItem.bind(this)
        this.nextItem = this.nextItem.bind(this)
        this.changeComment = this.changeComment.bind(this)
    }

    saveList() { 
        this.props.hideModal()
        this.props.addItemToCurrentList(this.state.itemsToAdd)
        this.setState({itemsToAdd: []})
    }

    addItem() {
        this.setState(
            {
                itemsToAdd: this.state.itemsToAdd.concat({name: this.props.processList[this.state.currentItem], comment: this.state.currentComment}),
                currentComment: ""
            }
        )
        this.nextItem()
    }

    nextItem() {
        if (this.state.currentItem <= this.props.processList.length-1) {
            this.setState({currentItem: this.state.currentItem + 1})
        } else {
            this.saveList()
        }
    }

    changeComment(event) {
        this.setState({currentComment: event.target.value})
    }

    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.hideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Processing {this.props.type} List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Item: <strong>{this.props.processList[this.state.currentItem]}</strong></h2>
                <Form className="processItemForm">
                    <Form.Row>
                        <Col>
                            <Form.Label>Comment</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Comment" value={this.state.currentComment} onChange={this.changeComment}/>
                        </Col>
                    </Form.Row>
                    <Button variant="danger" onClick={this.nextItem}>Skip</Button>
                    <Button variant="success" onClick={this.addItem}>Add</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.saveList}>Save</Button>
            </Modal.Footer>
        </Modal>)
    }
}



export default ProcessIngredientsModal