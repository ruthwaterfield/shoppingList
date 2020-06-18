import axios from 'axios'
import React, { Component } from 'react'
import { Form, Container, Row, Col} from 'react-bootstrap'

import baseUrl from '../baseurl'
import './List.css'

class ReadOnlyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requiredItemsBySection:[],
        }

        this.getRequiredItemsForSection = this.getRequiredItemsForSection.bind(this)
    }

    componentDidMount() {
        this.props.sections.forEach(section => {
            this.getRequiredItemsForSection(section)
        })
    }

    getRequiredItemsForSection(section) {
        axios.get(baseUrl + '/sectionRequiredItems/' + section.id).then(response => {
            this.setState({
                requiredItemsBySection: this.state.requiredItemsBySection.concat({
                    sectionName: section.section,
                    requiredItems: response.data 
                })
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className = "List-Holder">
                {this.state.requiredItemsBySection.map(section => 
                    <div className="list" key={section.id}>
                        <div className="spacedRow">
                            <h2>{section.sectionName}</h2>
                        </div>
                        <Container className="listItemCollection">
                            {section.requiredItems.map(item => 
                            <Row className="item" key={item.id}>
                                <Col xs={1}><Form.Check inline/></Col>
                                <Col xs={3}><strong>{item.name}</strong></Col>
                                <Col>{item.notes}</Col>
                            </Row>
                            )}
                        </Container>
                    </div>)
                }
            </div>
    )}
}

export default ReadOnlyList;
