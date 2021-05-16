import React, { useState } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'

export default function AddItemModal(props) {
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const [regular, setRegular] = useState(false)
    const [temporary, setTemporary] = useState(false)

    const changeName = (event) => setName(event.target.value)
    const changeNotes = (event) => setNotes(event.target.value)
    const toggleRegular = () => setRegular(!regular)
    const toggleTemporary = () => setTemporary(!temporary)

    async function addItem() {
        try {
            await axios.post(baseUrl + '/listitem/add', {
                name: name,
                section: props.sectionId,
                required: true,
                regular: regular,
                temporary: temporary,
                notes: notes
            })
            clearAndHideModal()
        } catch (error) {
            console.log(error)
        }
    }

    const clearAndHideModal = () => {
        setName("")
        setNotes("")
        setRegular(false)
        setTemporary(false)
        props.hideModal()
    }

    return (
        <Modal show={props.show} onHide={clearAndHideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form className="processItemForm">
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Item name" value={name} onChange={changeName}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Notes" value={notes} onChange={changeNotes}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 5, offset: 2 }}>
                            <Form.Check inline label="Regular" type="checkbox" checked={regular} onChange={toggleRegular} />
                        </Col>
                        <Col sm="5">
                            <Form.Check inline label="Temporary" type="checkbox" checked={temporary} onChange={toggleTemporary} />
                        </Col>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.hideModal}>Cancel</Button>
                    <Button variant="success" onClick={addItem}>Save</Button>
                </Modal.Footer>
        </Modal>)
}
