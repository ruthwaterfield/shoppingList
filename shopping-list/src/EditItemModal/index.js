import React, { useState, useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'

export default function EditItemModal(props) {
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const [regular, setRegular] = useState(false)
    const [temporary, setTemporary] = useState(false)

    const changeName = (event) => setName(event.target.value)
    const changeNotes = (event) => setNotes(event.target.value)
    const toggleRegular = () => setRegular(!regular)
    const toggleTemporary = () => setTemporary(!temporary)

    useEffect(() => {
        setName(props.item.name)
        setNotes(props.item.notes)
        setRegular(props.item.regular)
        setTemporary(props.item.temporary)
        }, [props])

    async function editItem() {
        try {
            await axios.post(baseUrl + '/listitem/edit/' + props.item.id, {
                name: name,
                section: props.item.section,
                required: props.item.required,
                regular: regular,
                temporary: temporary,
                notes: notes
            })
            props.hideModal()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal show={props.show} onHide={props.hideModal} centered="true" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editing {name}</Modal.Title>
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
                    <Button variant="success" onClick={editItem}>Save</Button>
                </Modal.Footer>
        </Modal>)
}
