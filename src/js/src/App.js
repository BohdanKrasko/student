import React, {Component} from 'react';
import './App.css';
import { getAllStudents } from './client';
import Conteiner from './Conteiner';
import {
	Table,
	Avatar,
	Spin,
	Empty,
	Button
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Footer from './Footer';
import Modal from 'antd/lib/modal/Modal';
import AddStudentForm from './forms/AddStudentForms';
import { errorNotification, successNotification } from './notification';

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
		})).catch(error => {
			const message = error.error.message;
			const description = error.error.error;
			errorNotification(message, description);
			this.setState({
				isFetching:false
			})
		})
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
		const commonElements = () => (
			<div>
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
								successNotification('Congratulation!', 'You successfully added new student');
							}}
							onFailuer = {error => {
								const message = error.error.message;
								const description = error.error.error;
								errorNotification(message, description);
							}}
							/>
					</Modal >
				<Footer numberOfStudents={students.length}
				handleAddStudentClickEvent={this.openAddStuudentModal}></Footer>
			</div>
		)  
		
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
				},
				{
					title: '',
					key: 'course',
					render: (text, student) => (
						<Button type='link' href='/courses'>Courses</Button>
					)
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
					{commonElements()}
				</Conteiner>
			);
		}
		return (<Conteiner>
			<Empty 
				style={{marginTop:'9em' }}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={
					<h1>No student found</h1>
				}
				/>
			{commonElements()};
		</Conteiner>
		);
	}
	
}

export default App;
