import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import './App.css';
import baseUrl from './baseurl'
import logo from './logo.svg'
import ReadOnlyList from './ReadOnlyList'
import Section from './Section'

export default function App() {
	const [readOnly, setReadOnly] = useState(false)
	const [sections, setSections] = useState([])

	const doPrint = () => window.print()
	const showReadOnly = () => setReadOnly(true)
	const hideReadOnly = () => setReadOnly(false)

	useEffect(() => {
		axios.get(baseUrl + '/sections')
		.then(response => setSections(response.data))
		.catch(error => console.log(error))
        }, []
    )

	return ( 
			<div className = "App" >
				<div className = "App-header" >
					<img src = {logo} className = "App-logo"alt = "logo"/>
					{readOnly?
					<Button className="coolButton" onClick={hideReadOnly} size="lg">Hide Read Only View</Button>
					:<Button className="coolButton" onClick={showReadOnly} size="lg">Show Read Only View</Button>
					}
					<Button className="coolButton" onClick={doPrint} size="lg">Print</Button>
				</div> 
				{readOnly ?
				<ReadOnlyList sections={sections} />
				:<div className = "List-Holder"> {
					sections.map(item =>
						<Section sectionId={item.id} section={item.section} key={item.id} />
					)}
				</div>
				}
			</div>
		)
}
