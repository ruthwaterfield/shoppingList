import React, { Fragment, useState } from 'react'
import { Container, Col, Row, Button, Badge } from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'
import EditItemModal from '../EditItemModal'

export default function ListItem(props) {
    const [editModal, setEditModal] = useState(false)

    async function removeItem() {
        try {
            await axios.post(baseUrl + '/listitem/edit/' + props.item.id, {
                name: props.item.name,
                section: props.item.section,
                required: false,
                regular: props.item.regular,
                temporary: props.item.temporary,
                notes: props.item.notes
            })
            props.reloadSection()
        } catch (error) {
            console.log(error);
        }
    }

    const showEditModal = () => setEditModal(true)
    const hideEditModal = () => {
        setEditModal(false)
        props.reloadSection()
    }

    let itemBadge
    if (props.item.regular) {
        itemBadge = <Badge variant="secondary" className="ml-1">Regular</Badge>
    } else if (props.item.temporary) {
        itemBadge = <Badge variant="warning" className="ml-1">Temporary</Badge>
    }

    return (
        <Fragment>
            <Container className="m-1 pl-3 pr-3 pt-2 pb-2 itemColors rounded">
                <Row>
                    <Col xs={4}>
                        <strong>{props.item.name}</strong>
                        {itemBadge}
                    </Col>
                    <Col>{props.item.notes}</Col>
                    <Col xs={2}>
                        <Button onClick={showEditModal} variant="outline-primary" size="sm" className="w-100">
                            Edit
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={removeItem} variant="outline-danger" size="sm" className="w-100">
                            Remove
                        </Button>
                    </Col>
                </Row>
            </Container>

            <EditItemModal 
                show={editModal}
                hideModal={hideEditModal}
                item={props.item}
            />
        </Fragment>
        )
}
