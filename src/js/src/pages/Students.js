import React, {Component} from 'react';
import '../App.css';
import { getAllStudents, deleteStudent } from '../client';
import Conteiner from '../Conteiner';
import {
	Table,
	Avatar,
	Spin,
	Empty,
	Button,
	Popconfirm
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Footer from '../Footer';
import Modal from 'antd/lib/modal/Modal';
import AddStudentForm from '../forms/AddStudentForms';
import EditStudentForm from '../forms/EditStudentForm';
import { errorNotification, successNotification } from '../notification';
import { Link } from 'react-router-dom';

const antIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
const textConfirm = 'Are you sure to delete this task?';

class Students extends Component {

	state = {
		students: [],
		selectedStudent: {},
		isFetching: false,
		isAddStuudentModalVisibility: false,
		isEditStudentModalVisibil: false
	}
	componentDidMount () {
		this.fetchStudents();
    }

	openAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: true})
	openEditStudentModal = () => this.setState({isEditStudentModalVisibil: true})

	closeAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: false})
	closeEditStudentModal = () => this.setState({isEditStudentModalVisibil: false})

	deleteSt = (id, name) => {
        deleteStudent(id).then(() => {
				successNotification(`You delete ${name}`, '')
				this.fetchStudents()}
		).catch(err => {console.log(err);})
	}
	editStudent = selectedStudent => {
		this.setState({selectedStudent})
		this.openEditStudentModal()
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

		
		const {students, isFetching, isAddStuudentModalVisibility, isEditStudentModalVisibil} = this.state;
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
		
		const editModal = () => (
			<div>
				<Modal
					visible={isEditStudentModalVisibil}
					title="Edit"
					onOk={this.closeEditStudentModal}
					onCancel={this.closeEditStudentModal}
					width={1000}
					footer={[
					<Button key="back" onClick={this.closeEditStudentModal}>
						Return
					</Button>,
					<Button key="submit" type="primary">
						Submit
					</Button>,
					]}>
					<EditStudentForm initialValues = {this.state.selectedStudent}></EditStudentForm>
				</Modal>
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
					title: 'Email',
					dataIndex: 'email',
					key: 'email'
				},
				{
					title: 'Gender',
					dataIndex: 'gender',
					key: 'gender'
				},
				{
					title: '',
					key: 'course',
					render: (text, student) => (
						<Link to={`/${student.studentId}/courses`}>Course</Link>
					)
				},
				{
					title: '',
					key: 'test',
					render: (text, student) => {
						return (
							<Button onClick={() => this.editStudent(student)}>Edit</Button>
							
						)
											
					}
				},
				{
					title: '',
					key: 'delete',
					render: (text, student) => (
						<Popconfirm placement="topLeft" 
							title={textConfirm} 
							onConfirm={() => this.deleteSt(student.studentId, student.firstName)} okText="Yes" cancelText="No"
							>
							<Button danger >Delete</Button>
						  </Popconfirm>
						  	
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
					{editModal()}
				</Conteiner>
			);
		}
		return (<Conteiner>
			<Empty 
				style={{marginTop:'9em' }}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={
					'No student found'
				}
				/>
			{commonElements()};
		</Conteiner>
		);
		
	}
	
}

export default Students;