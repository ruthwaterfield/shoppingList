import React, { Component } from 'react'

import './ListItem.css'

class ListItem extends Component{
    render() {
        return (
            <div className="item">
                <p>• <strong>{this.props.name}</strong></p>
                <p>{this.props.comment}</p>
            </div>
        )
    }
}



export default ListItem