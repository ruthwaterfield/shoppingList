import React, {
	Component
} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import List from './List/List.js';
import './App.css';
import baseUrl from './baseurl'


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: []
		}
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

	render() {
		return ( 
			<div className = "App" >
				<div className = "App-header" >
				<img src = {logo} className = "App-logo"alt = "logo" />
				</div> 
				<div className = "List-Holder"> {
					this.state.sections.map(item =>
					<List sectionId={item.id} section={item.section} key={item.id} />
					)}
				</div>
			</div>
		)
	}
}

export default App
