import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import List from './List/List.js';
import './App.css';
import baseUrl from './baseurl'


class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			sections: []
		}
	}

	componentDidMount() {
        axios.get(baseUrl+'/sections').then(response => 
            {
                this.setState({sections: response.data})
            }
        ).catch(error => {
                console.log(error)
            }
        )
    }

	render () {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<body className="List-Holder">
					{this.state.sections.map(item => 
						<List type={item.section} key={item.id} id={item.id}/>
					)}
				</body>
			</div>
		);
	}
}

export default App;
