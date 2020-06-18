import React, { Component, Fragment } from 'react'
import {Container, Col, Row, Button } from 'react-bootstrap'
import axios from 'axios'

import baseUrl from '../baseurl'
import EditItemModal from '../EditItemModal'

class ListItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showEditModal: false
        }

        this.removeItem = this.removeItem.bind(this)

        this.showEditModal = this.showEditModal.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
    }

    removeItem() {
        axios.post(baseUrl + '/listitem/edit/' + this.props.item.id, {
            name: this.props.item.name,
            section: this.props.item.section,
            required: false,
            notes: this.props.item.notes
        }).then(response => {
            this.props.reloadSection()
        }).catch(error => {
            console.log(error)
        })
    }

    showEditModal() {
        this.setState({showEditModal: true})
    }

    hideEditModal() {
        this.setState({showEditModal: false})
        this.props.reloadSection()
    }

    render() {
        return (
            <Fragment>
            <Container className="m-1 pl-3 pr-3 pt-2 pb-2 itemColors rounded">
                <Row>
                    <Col xs={3}><strong>{this.props.item.name}</strong></Col>
                    <Col>{this.props.item.notes}</Col>
                    <Col xs={2}>
                        <Button onClick={this.showEditModal} variant="outline-primary" size="sm" className="w-100">
                            Edit
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={this.removeItem} variant="outline-danger" size="sm" className="w-100">
                            Remove
                        </Button>
                    </Col>
                </Row>
            </Container>

            <EditItemModal 
                show={this.state.showEditModal}
                hideModal={this.hideEditModal}
                item={this.props.item}
            />
            </Fragment>
        )
    }
}

export default ListItem
