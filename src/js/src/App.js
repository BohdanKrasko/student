import React, {Component} from 'react';
import './App.css';
import { 
	BrowserRouter as Router,
	Route} from 'react-router-dom';
import Courses from './pages/Courses';
import Students from './pages/Students';

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path='/:studentId/courses' component={Courses}/>
				<Route exact path='/students' component={Students}/>
			</Router>
		)
	}
}

export default App;
