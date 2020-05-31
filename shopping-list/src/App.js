import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js';

function App() {
  	return (
    	<div className="App">
      
      		<header className="App-header">
        		<img src={logo} className="App-logo" alt="logo" />
      		</header>
      		<body className="List-Holder">
      			<List type="Beans"/>
				<List type="Beans"/>
				<List type="Beans"/>
				<List type="Beans"/>
				<List type="Beans"/>
      		</body>
    	</div>
  );
}

export default App;
