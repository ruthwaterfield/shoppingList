import axios from 'axios'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import AddItemModal from '../AddItemModal'
import baseUrl from '../baseurl'
import ProcessListModal from '../ProcessListModal'
import ListItem from '../ListItem'
import './List.css'

class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requiredItems:[],
            allSectionItems:[],
            additionalItems:[],
            showAddItemModal: false,
            showProcessSectionModal: false,
            showAdditionalItemsModal: false
        }

        this.getRequiredItems = this.getRequiredItems.bind(this)
        this.resetSection = this.resetSection.bind(this)

        this.showAddItemModal = this.showAddItemModal.bind(this)
        this.hideAddItemModal = this.hideAddItemModal.bind(this)

        this.showProcessSectionModal = this.showProcessSectionModal.bind(this)
        this.hideProcessSectionModal = this.hideProcessSectionModal.bind(this)

        this.showAdditionalItemsModal = this.showAdditionalItemsModal.bind(this)
        this.hideAdditionalItemsModal = this.hideAdditionalItemsModal.bind(this)
    }

    componentDidMount() {
        this.getRequiredItems()
    }

    getRequiredItems() {
        axios.get(baseUrl + '/sectionRequiredItems/' + this.props.sectionId).then(response => {
            this.setState({
                requiredItems: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    resetSection() {
        axios.post(baseUrl + '/resetSection/' + this.props.sectionId).then(response => {
            this.getRequiredItems()
        }).catch(error => {
            console.log(error)
        })
    }

    showAddItemModal() {
        this.setState({showAddItemModal: true})
    }

    hideAddItemModal() {
        this.getRequiredItems()
        this.setState({
            showAddItemModal: false,
        })
    }

    showProcessSectionModal() {
        axios.get(baseUrl+'/sectionPotentialItems/'+this.props.sectionId).then(response => {
            this.setState({
                allSectionItems: response.data,
                showProcessSectionModal: true
            })
        }).catch(error => {
            console.log(error)
        })
    }

    hideProcessSectionModal() {
        this.getRequiredItems()
        this.setState({
            showProcessSectionModal: false,
        })
    }

    showAdditionalItemsModal() {
        axios.get(baseUrl + '/sectionNotRequiredItems/' + this.props.sectionId).then(response => {
            this.setState({
                additionalItems: response.data,
                showAdditionalItemsModal: true
            })
        }).catch(error => {
            console.log(error)
        })
    }
    
    hideAdditionalItemsModal() {
        this.getRequiredItems()
        this.setState({
            showAdditionalItemsModal: false,
        })
    }

    render() {
        return (
        <div className="bgColor m-2 p-3 text-left d-flex position-relative justify-content-between flex-column rounded w-40">
            <div className="p-1">
                <h2>{this.props.section}</h2>
            </div>
            <div className="flex-grow-1">
                {this.state.requiredItems.map(item => 
                    <ListItem 
                        item={item} 
                        reloadSection={this.getRequiredItems}
                        key={item.id}
                    />
                )}
            </div>
            <div className="d-flex justify-content-between p-1">
                <Button className="coolButton" onClick={this.showAdditionalItemsModal} variant="secondary" size="sm">
                    Other Items
                </Button>
                <Button className="coolButton" onClick={this.showProcessSectionModal} variant="dark" size="sm">
                    Process Section
                </Button>
                <Button className="coolButton" onClick={this.showAddItemModal}  variant="success" size="sm">
                    New Item
                </Button>
                <Button className="coolButton" onClick={this.resetSection} variant="danger" size="sm">
                    Reset Section
                </Button>
            </div>

            <AddItemModal
                show={this.state.showAddItemModal}
                hideModal={this.hideAddItemModal}
                sectionId={this.props.sectionId}
            />

            <ProcessListModal 
                show={this.state.showProcessSectionModal}
                hideModal={this.hideProcessSectionModal}
                section={this.props.section}
                processList={this.state.allSectionItems}
            />

            <ProcessListModal 
                show={this.state.showAdditionalItemsModal}
                hideModal={this.hideAdditionalItemsModal}
                section={this.props.section}
                processList={this.state.additionalItems}
            />
        </div>
    )}
}

export default Section;
