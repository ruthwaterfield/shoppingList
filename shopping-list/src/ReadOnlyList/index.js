import axios from 'axios'
import React, { Component } from 'react'

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
                        <div className="listItemCollection">
                            {section.requiredItems.map(item => 
                            <div className="item" key={item.id}>
                                <div id="itemName"><strong>{item.name}</strong></div>
                                <div id="itemComment">{item.notes}</div>
                            </div>
                            )}
                        </div>
                    </div>)
                }
            </div>
    )}
}

export default ReadOnlyList;
