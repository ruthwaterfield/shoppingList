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
            notRequiredItems:[],
            addValue: "",
            showProcessSectionModal: false
        }
        this.addNewItemToContents = this.addNewItemToContents.bind(this)
        this.requireItem = this.requireItem.bind(this)

        this.handleAddTextChange = this.handleAddTextChange.bind(this)

        this.showProcessSectionModal = this.showProcessSectionModal.bind(this)
        this.hideProcessSectionModal = this.hideProcessSectionModal.bind(this)
    }

    componentDidMount() {
        axios.get(baseUrl+'/sectionRequiredItems/'+this.props.sectionId).then(response => {
                this.setState({requiredItems: response.data})
        }).catch(error => {
                console.log(error)
            }
        )

        axios.get(baseUrl+'/sectionPotentialItems/'+this.props.sectionId).then(response => {
                this.setState({allSectionItems: response.data})
            }).catch(error => {
                console.log(error)
            }
        )
    }

    showProcessSectionModal() { this.setState({showProcessSectionModal: true}) }
    hideProcessSectionModal() { this.setState({showProcessSectionModal: false}) }

    requireItem(item) {
        this.setState({requiredItems: this.state.requiredItems.concat(item)})
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
            <div className="topRow">
                <h2>{this.props.section}</h2>
                <Button onClick={this.showProcessSectionModal} variant="secondary" size="sm">
                    Process List
                </Button>
            </div>
                {this.state.requiredItems.map(item => 
                    <ListItem id={item.id} name={item.name} comment={item.comment} section={item.section} key={item.id}/>
                )}
            <Form onSubmit={this.addNewItemToContents} className="ingredientForm">
                <Form.Control type="text" value={this.state.addValue} onChange={this.handleAddTextChange}/>
                <Button type="submit">Submit</Button>
            </Form>

            <ProcessIngredientsModal 
                show={this.state.showProcessSectionModal}
                hideModal={this.hideProcessSectionModal}
                section={this.props.section}
                processList={this.state.allSectionItems}
                requireItem={this.requireItem}
            />
        </div>
    )}
}


export default List;
