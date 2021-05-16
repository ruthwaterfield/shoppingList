import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'react-bootstrap'

import AddItemModal from '../AddItemModal'
import baseUrl from '../baseurl'
import ProcessListModal from '../ProcessListModal'
import ListItem from '../ListItem'
import './List.css'

export default function Section(props) {
    const [requiredItems, setRequiredItems] = useState([])
    const [regularSectionItems, setRegularSectionItems] = useState([])
    const [irregularSectionItems, setIrregularSectionItems] = useState([])
    const [addItemModal, setAddItemModal] = useState(false)
    const [processSectionModal, setProcessSectionModal] = useState(false)
    const [additionalItemsModal, setAdditionalItemsModal] = useState(false)

    const getRequiredItems = useCallback(() => {
        axios.get(baseUrl + '/sectionRequiredItems/' + props.sectionId)
        .then(response => setRequiredItems(response.data))
        .catch(error => console.log(error))
      }, [props.sectionId])

    useEffect(() => {
        if (additionalItemsModal | processSectionModal | additionalItemsModal) {
            return
        } else {
            getRequiredItems()
        }
        }, [props, addItemModal, processSectionModal, additionalItemsModal, getRequiredItems]
    )

    const resetSection = () => {
        axios.post(baseUrl + '/resetSection/' + props.sectionId)
        .then(response => getRequiredItems())
        .catch(error => console.log(error))
    }

    const showAddItemModal = () => setAddItemModal(true)
    const hideAddItemModal = () => setAddItemModal(false)
    
    const showProcessSectionModal = () => {
        axios.get(baseUrl+'/sectionRegularItems/'+ props.sectionId)
        .then(response => {
            setRegularSectionItems(response.data)
            setProcessSectionModal(true)
        })
        .catch(error => console.log(error))
    }

    const hideProcessSectionModal = () => setProcessSectionModal(false)

    const showAdditionalItemsModal = () => {
        axios.get(baseUrl + '/sectionIrregularItems/' + props.sectionId)
        .then(response => {
            setIrregularSectionItems(response.data)
            setAdditionalItemsModal(true)
        })
        .catch(error => console.log(error))
    }
    
    const hideAdditionalItemsModal= () => setAdditionalItemsModal(false)

    return (
        <div className="bgColor m-2 p-3 text-left d-flex position-relative justify-content-between flex-column rounded w-40">
            <div className="p-1">
                <h2>{props.section}</h2>
            </div>
            <div className="flex-grow-1">
                {requiredItems.map(item => 
                    <ListItem 
                        item={item} 
                        reloadSection={getRequiredItems}
                        key={item.id}
                    />
                )}
            </div>
            <div className="d-flex justify-content-between p-1">
                <Button className="coolButton" onClick={showAdditionalItemsModal} variant="secondary" size="sm">
                    Other Items
                </Button>
                <Button className="coolButton" onClick={showProcessSectionModal} variant="dark" size="sm">
                    Regular Items
                </Button>
                <Button className="coolButton" onClick={showAddItemModal}  variant="success" size="sm">
                    New Item
                </Button>
                <Button className="coolButton" onClick={resetSection} variant="danger" size="sm">
                    Reset Section
                </Button>
            </div>
            <AddItemModal
                show={addItemModal}
                hideModal={hideAddItemModal}
                sectionId={props.sectionId}
            />
            <ProcessListModal 
                show={processSectionModal}
                hideModal={hideProcessSectionModal}
                section={props.section}
                processList={regularSectionItems}
            />
            <ProcessListModal 
                show={additionalItemsModal}
                hideModal={hideAdditionalItemsModal}
                section={props.section}
                processList={irregularSectionItems}
            />
        </div>
    )
}
