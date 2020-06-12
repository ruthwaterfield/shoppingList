import React, {
	Component
} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import Section from './Section';
import './App.css';
import baseUrl from './baseurl'

import Button from 'react-bootstrap/Button'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: []
		}

		this.doPrint = this.doPrint.bind(this)
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

	render() {
		return ( 
			<div className = "App" >
				<div className = "App-header" >
					<img src = {logo} className = "App-logo"alt = "logo"/>
					<Button onClick={this.doPrint}>Print</Button>
				</div> 
				<div className = "List-Holder"> {
					this.state.sections.map(item =>
						<Section sectionId={item.id} section={item.section} key={item.id} />
					)}
				</div>
			</div>
		)
	}
}

export default App
