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
            contents:[],
            addValue: "",
            showModal: false,
            toProcessFromServer: []
        }
        this.addNewItemToContents = this.addNewItemToContents.bind(this)
        this.addItemToContents = this.addItemToContents.bind(this)

        this.handleAddTextChange = this.handleAddTextChange.bind(this)

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    componentDidMount() {
        axios.get(baseUrl+'/sectionPotentialItems/'+this.props.id).then(response => 
            {
                var responseItems = response.data.map(function (item) {
                    return item.name
                })
                this.setState({toProcessFromServer: responseItems})
            }
        ).catch(error => {
                console.log(error)
            }
        )
    }

    showModal() { this.setState({showModal: true}) }
    hideModal() { this.setState({showModal: false}) }

    addItemToContents(items) {
        this.setState({contents: this.state.contents.concat(items)})
    }

    addNewItemToContents(event) {
        // call api to save item
        this.setState({contents: this.state.contents.concat({name:this.state.addValue, comment: ""})})
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
                <h2>{this.props.type}</h2>
                <Button onClick={this.showModal} variant="secondary" size="sm">
                    Process List
                </Button>
            </div>
            <ul>
                {this.state.contents.map(item => 
                    <ListItem name={item.name} comment={item.comment} key={item.id}/>
                )}
            </ul>

            <Form onSubmit={this.addNewItemToContents} className="ingredientForm">
                <Form.Control type="text" value={this.state.addValue} onChange={this.handleAddTextChange}/>
                <Button type="submit">Submit</Button>
            </Form>

            <ProcessIngredientsModal 
                show={this.state.showModal}
                hideModal={this.hideModal}
                type={this.props.type}
                processList={this.state.toProcessFromServer}
                addItemToCurrentList={this.addItemToContents}
            />
        </div>
    )}
}


export default List;
