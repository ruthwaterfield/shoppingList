import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import baseUrl from '../baseurl'

export default function ReadOnlyList(props) {
    const [requiredItemsBySection, setRequiredItemsBySection] = useState([])

    useEffect(() => {
        const getRequiredItemsForSection = (section) => {
            axios.get(baseUrl + '/sectionRequiredItems/' + section.id)
            .then(response => {
                setRequiredItemsBySection(previousSections => 
                    previousSections.concat({
                    sectionId: section.id,
                    sectionName: section.section,
                    requiredItems: response.data 
                }))
            })
            .catch(error => {
                console.log(error)
            })
        }

        props.sections.forEach(section => {
            getRequiredItemsForSection(section)
        })
        }, [props.sections]
    )

    return (
        <div className = "List-Holder">
            {requiredItemsBySection.sort((a, b) => a.sectionId - b.sectionId).map(section => 
                <div className="bgColor m-2 p-2 position-relative justify-content-between text-left rounded" key={section.sectionName}>
                    <h2 className="m-2">{section.sectionName}</h2>
                    <Container className="flex-grow-1">
                        {section.requiredItems.map(item => 
                        <Row className="itemColors d-flex justify-content-between m-1 p-0 rounded border" key={item.id}>
                            <Col xs={1}><div className="w-75 h-75 border border-dark bg-white m-sm-1"/></Col>
                            <Col xs={4}><strong>{item.name}</strong></Col>
                            <Col>{item.notes}</Col>
                        </Row>
                        )}
                    </Container>
                </div>)
            }
        </div>
)

}
