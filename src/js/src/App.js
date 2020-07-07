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
import Footer from './Footer';
import Modal from 'antd/lib/modal/Modal';
import AddStudentForm from './forms/AddStudentForms';

const antIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
class App extends Component {

	state = {
		students: [],
		isFetching: false,
		isAddStuudentModalVisibility: false
	}
	componentDidMount () {
		this.fetchStudents();
	}
	openAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: true})

	closeAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: false})

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
		const {students, isFetching, isAddStuudentModalVisibility} = this.state;
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
					<Table style={{marginBottom:'100px'}}
						dataSource={students} 
						columns={columns} 
						rowKey='studentId'
						pagination= {false}
					/>
					<Modal 
						title='Add new student'
						visible={isAddStuudentModalVisibility}
						onOk={this.closeAddStuudentModal}
						onCancel={this.closeAddStuudentModal}
						cancelText={true}
						okText={true}
						width={1000}>
							<AddStudentForm 
							onSuccess = {() =>
								{
									this.closeAddStuudentModal();
									this.fetchStudents();
								}
							}/>
						</Modal >
					<Footer numberOfStudents={students.length}
					handleAddStudentClickEvent={this.openAddStuudentModal}></Footer>
				</Conteiner>
			);
		}
		return <h1>No Students found</h1>;
	}
	
}

export default App;
