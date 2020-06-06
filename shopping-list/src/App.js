import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  	return (
    	<div className="App">
      
      		<header className="App-header">
        		<img src={logo} className="App-logo" alt="logo" />
      		</header>
      		<body className="List-Holder">
      			<List type="Fruit/Veg"/>
				<List type="Fridge"/>
				<List type="Dry"/>
				<List type="Misc."/>
				<List type="Frozen"/>
      		</body>
    	</div>
  );
}

export default App;
