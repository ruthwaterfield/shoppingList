import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import './App.css';
import baseUrl from './baseurl'
import logo from './logo.svg'
import ReadOnlyList from './ReadOnlyList'
import Section from './Section'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			readOnly: false,
			sections: []
		}

		this.doPrint = this.doPrint.bind(this)
		this.showReadOnly = this.showReadOnly.bind(this)
		this.hideReadOnly = this.hideReadOnly.bind(this)
	}

	componentDidMount() {
		axios.get(baseUrl + '/sections').then(response => {
			this.setState({
				sections: response.data
			})
		}).catch(error => {
			console.log(error)
		})
	}

	doPrint() {
		window.print()
	}

	showReadOnly() {
		this.setState({readOnly: true})
	}

	hideReadOnly() {
		this.setState({readOnly: false})
	}

	render() {
		return ( 
			<div className = "App" >
				<div className = "App-header" >
					<img src = {logo} className = "App-logo"alt = "logo"/>
					<Button className="coolButton" onClick={this.doPrint} size="lg">Print</Button>
					{this.state.readOnly?
					<Button className="coolButton" onClick={this.hideReadOnly} size="lg">Hide Read Only View</Button>
					:<Button className="coolButton" onClick={this.showReadOnly} size="lg">Show Read Only View</Button>
					}
				</div> 
				{this.state.readOnly ?
				<ReadOnlyList sections={this.state.sections} />
				:<div className = "List-Holder"> {
					this.state.sections.map(item =>
						<Section sectionId={item.id} section={item.section} key={item.id} />
					)}
				</div>
				}
			</div>
		)
	}
}

export default App
