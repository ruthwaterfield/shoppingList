import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Row, Col, Form, Button }  from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'

export default function ProcessListModal(props) {
    const [needToProcess, setNeedToProcess] = useState(false)
    const [currentItemPosition, setCurrentItemPosition] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [currentName, setCurrentName] = useState()
    const [currentNotes, setCurrentNotes] = useState()

    useEffect(() => {
        if (props.show && props.processList.length > 0) {
            const firstItem = props.processList[0]
            setCurrentItemPosition(0)
            setCurrentItem(firstItem)
            setCurrentName(firstItem.name)
            setCurrentNotes(firstItem.notes)
            setNeedToProcess(true)
        }
    }, [props]
    )

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') { 
            editItem(true)
        }
    }

    const requireItem = () => editItem(true)
    const notRequireItem= () => editItem(false)

    const editItem = (required) => {
        axios.post(baseUrl + '/listitem/edit/' + currentItem.id, {
            name: currentName,
            section: currentItem.section,
            required: required,
            regular: currentItem.regular,
            temporary: currentItem.temporary,
            notes: currentNotes
        })
        .then(response => nextItem())
        .catch(error => console.log(error))
    }

    const deleteItem= () => {
        axios.delete(baseUrl + '/listitem/' + currentItem.id)
        .then(response => nextItem())
        .catch(error => console.log(error))
    }

    const nextItem= () => {
        const nextItemPosition = currentItemPosition + 1
        if (nextItemPosition < props.processList.length) {
            const nextItem = props.processList[nextItemPosition]
            setCurrentItemPosition(nextItemPosition)
            setCurrentItem(nextItem)
            setCurrentName(nextItem.name)
            setCurrentNotes(nextItem.notes)
        } else {
            setNeedToProcess(false)
        }
    }

    const changeName = (event) => setCurrentName(event.target.value)
    const changeNotes = (event) => setCurrentNotes(event.target.value)

    return (
        <Modal show={props.show} onHide={props.hideModal} centered="true" size="lg"  onKeyDown={handleKeyPress}>
            {needToProcess ?
            <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Processing {props.section} - {currentName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="processItemForm">
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Item name" value={currentName} onChange={changeName}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Notes" value={currentNotes} onChange={changeNotes}/>
                        </Col>
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mr-auto" variant="warning" onClick={deleteItem}>Delete Item Forever</Button>
                    <Button variant="danger" onClick={notRequireItem}>Not Today</Button>
                    <Button variant="success" onClick={requireItem}>Yes Please!</Button>
                </Modal.Footer>
            </Fragment>
            :<Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Processing {props.section}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Nothing to process- all done!</div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.hideModal}>Finished!</Button>
                </Modal.Footer>
            </Fragment>}
        </Modal>)
}
