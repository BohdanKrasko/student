import React, {Component} from 'react';
import './App.css';
import { getAllStudents } from './client';
import Conteiner from './Conteiner';
import {
	Table,
	Avatar,
	Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
class App extends Component {

	state = {
		students: [],
		isFetching: false
	}
	componentDidMount () {
		this.fetchStudents();
	}
	fetchStudents = () => {
		this.setState({
			isFetching: true
		});
		getAllStudents()
		.then(res => res.json()
		.then(students => {
			console.log(students)
			this.setState({students, isFetching: false})
		}));
	}
	
	render() {
		const {students, isFetching} = this.state;
		if(isFetching) {
			return (
				<div className='spinner'>
					<Spin indicator={antIcon()}/>
				</div>			
			)
		}
		if(students && students.length) {
			const columns = [
				{
					title: '',
					key: 'avatar',
					render: (text, student) => (
						<Avatar size='large'>
							{`${student.firstName.charAt(0).toUpperCase()} ${student.lastName.charAt(0).toUpperCase()}`}
						</Avatar>
					)
				},
				{
					title: 'StudentId',
					dataIndex: 'studentId',
					key: 'studentId'
				},
				{
					title: 'First Name',
					dataIndex: 'firstName',
					key: 'firstName'
				},
				{
					title: 'Last Name',
					dataIndex: 'lastName',
					key: 'lastName'
				},
				{
					title: 'Last Name',
					dataIndex: 'lastName',
					key: 'lastName'
				},
				{
					title: 'Gender',
					dataIndex: 'gender',
					key: 'gender'
				},
				{
					title: 'Email',
					dataIndex: 'email',
					key: 'email'
				}
			];
			return (
				<Conteiner>
					<Table 
						dataSource={students} 
						columns={columns} 
						rowKey='studentId'
						pagination= {false}
					/>
				</Conteiner>
			);
		}
		return <h1>No Students found</h1>;
	}
	
}

export default App;
