import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import baseUrl from '../baseurl'
import './ListItem.css'
import EditItemModal from '../EditItemModal/EditItemModal'

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
        })
        this.props.reloadSection()
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
            <div className="item">
                <div><strong>{this.props.item.name}</strong></div>
                <div>{this.props.item.notes}</div>
                <Button onClick={this.removeItem} variant="danger" size="s">
                    Remove
                </Button>
                <Button onClick={this.showEditModal} variant="info" size="s">
                    Edit
                </Button>
            </div>

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
