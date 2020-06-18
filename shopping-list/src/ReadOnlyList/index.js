import axios from 'axios'
import React, { Component } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import baseUrl from '../baseurl'

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
                    <div className="bgColor m-2 p-2 position-relative justify-content-between text-left" key={section.id}>
                        <h2 className="m-2">{section.sectionName}</h2>
                        <Container className="flex-grow-1">
                            {section.requiredItems.map(item => 
                            <Row className="readOnlyItem d-flex justify-content-between m-1 p-0" key={item.id}>
                                <Col xs={1}><div className="w-75 h-75 border border-dark bg-white m-sm-1"/></Col>
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
