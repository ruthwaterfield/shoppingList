import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import ProcessIngredientsModal from '../ProcessIngredientsModal/ProcessIngredientsModal'
import baseUrl from '../baseurl'
import ListItem from '../ListItem/ListItem'
import './List.css'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requiredItems:[],
            allSectionItems:[],
            additionalItems:[],
            addValue: "",
            showProcessSectionModal: false,
            showAdditionalItemsModal: false
        }
        this.addNewItemToContents = this.addNewItemToContents.bind(this)

        this.getRequiredItems = this.getRequiredItems.bind(this)

        this.handleAddTextChange = this.handleAddTextChange.bind(this)

        this.showProcessSectionModal = this.showProcessSectionModal.bind(this)
        this.hideProcessSectionModal = this.hideProcessSectionModal.bind(this)

        this.showAdditionalItemsModal = this.showAdditionalItemsModal.bind(this)
        this.hideAdditionalItemsModal = this.hideAdditionalItemsModal.bind(this)
    }

    componentDidMount() {
        this.getRequiredItems()

        axios.get(baseUrl+'/sectionPotentialItems/'+this.props.sectionId).then(response => {
                this.setState({allSectionItems: response.data})
            }).catch(error => {
                console.log(error)
            }
        )
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

    showProcessSectionModal() {
        this.setState({showProcessSectionModal: true})
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

    addNewItemToContents(event) {
        // call api to save item
        this.setState({requiredItems: this.state.requiredItems.concat({name:this.state.addValue, comment: ""})})
        axios.post(baseUrl+'/listitem/add', {name: this.state.addValue, section: this.props.id, required: true, notes: ""}).then(

            )
        event.preventDefault()
        this.setState({addValue: ""})
    }

    handleAddTextChange(event) {
        this.setState({addValue: event.target.value})
    }

    render() {
        return (
        <div className="list">
            <div className="spacedRow">
                <h2>{this.props.section}</h2>
                <Button onClick={this.showProcessSectionModal} variant="secondary" size="sm">
                    Process entire section
                </Button>
            </div>
                {this.state.requiredItems.map(item => 
                    <ListItem id={item.id} name={item.name} notes={item.notes} section={item.section} key={item.id}/>
                )}
                <div className="spacedRow">
                <Button onClick={this.showAdditionalItemsModal} variant="secondary" size="sm">
                    Process items not currently on the list
                </Button>
                </div>
            <Form onSubmit={this.addNewItemToContents} className="ingredientForm">
                <Form.Control type="text" value={this.state.addValue} onChange={this.handleAddTextChange}/>
                <Button type="submit">Submit</Button>
            </Form>

            <ProcessIngredientsModal 
                show={this.state.showProcessSectionModal}
                hideModal={this.hideProcessSectionModal}
                section={this.props.section}
                processList={this.state.allSectionItems}
            />

            <ProcessIngredientsModal 
                show={this.state.showAdditionalItemsModal}
                hideModal={this.hideAdditionalItemsModal}
                section={this.props.section}
                processList={this.state.additionalItems}
            />
        </div>
    )}
}


export default List;
