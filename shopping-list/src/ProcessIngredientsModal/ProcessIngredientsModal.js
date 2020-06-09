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
        
        this.addItem = this.addItem.bind(this)
        this.nextItem = this.nextItem.bind(this)
        this.changeComment = this.changeComment.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((this.props.processList !== prevProps.processList) &&
            this.props.processList.length > 0) {
            this.setState({
                currentItemPosition: 0,
                currentItem: this.props.processList[0],
                currentComment: "",
                needToProcess: true
            })
        }
    }

    addItem() {
        axios.post(baseUrl + '/listitem/edit/' + this.state.currentItem.id, {
            name: this.state.currentItem.name,
            section: this.state.currentItem.section,
            required: true,
            notes: this.state.currentComment
        }).then(response => {
            this.setState({
                currentComment: ""
            })
            this.props.requireItem(response.data)
            this.nextItem()
        })
    }

    nextItem() {
        if (this.state.currentItemPosition <= this.props.processList.length - 1) {
            this.setState({
                currentItemPosition: this.state.currentItemPosition + 1,
                currentItem: this.props.processList[this.state.currentItemPosition + 1]
            })
        } else {
            this.setState({needToProcess: false})
        }
    }

    changeComment(event) {
        this.setState({currentComment: event.target.value})
    }

    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.hideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Processing {this.props.section} List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.needToProcess ?
                <div>
                <h2>Item: <strong>{this.state.currentItem.name}</strong></h2>
                <Form className="processItemForm">
                    <Form.Row>
                        <Col>
                            <Form.Label>Comment</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Comment" value={this.state.currentComment} onChange={this.changeComment}/>
                        </Col>
                    </Form.Row>
                    <Button variant="danger" onClick={this.nextItem}>No, ta</Button>
                    <Button variant="success" onClick={this.addItem}>Yes pls</Button>
                </Form>
                </div>
                :<div>Nothing to process- all done!</div> }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.hideModal}>Finished!</Button>
            </Modal.Footer>
        </Modal>)
    }
}



export default ProcessIngredientsModal