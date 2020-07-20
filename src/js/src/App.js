import React, {Component} from 'react';
import './App.css';
import { 
	BrowserRouter as Router,
	Route} from 'react-router-dom';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Test from './pages/test'

class App extends Component {
	render() {
		return (
		
			<Router >
				<Route exact path='/' component={Students}/>
				<Route exact path='/:studentId/courses' component={Courses}/>
				<Route path='/test' component={Test}/>
			</Router>
			
		)
	}
}

export default App;
