import React, {Component} from 'react';
import './App.css';
import { getAllStudents } from './client';


class App extends Component {
	state = {
		students: []
	}
	componentDidMount () {
		this.fetchStudents();
	}
	fetchStudents = () => {
		getAllStudents()
		.then(res => res.json()
		.then(students => {
			console.log(students)
			this.setState({students})
		}));
	}
	
	render() {
		const {students} = this.state;
		if(students && students.length) {

			return students.map((student, index) => {
				return (
				<div key = {index}>
					<h1>index = {index}</h1>
				<h2>{student.studentId}</h2>
				<p>{student.firstName}</p>
				<p>{student.lastName}</p>
				<p>{student.email}</p>
				<p>{student.gender}</p>
				</div>
				);
			})
		}
		return <h1>No Students found</h1>;
	}
	
}

export default App;
