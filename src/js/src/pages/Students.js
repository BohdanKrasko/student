import React, {Component} from 'react';
import '../App.css';
import { getAllStudents, deleteStudent, updateStudent, getOffsetStudents, getCountStudents } from '../client';
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
import { errorNotification, successNotification } from '../notification';
import { Link } from 'react-router-dom';
import EditStudentForm from '../forms/EditStudentForm';
import PagePagination from '../component/PagePagination';

const antIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
const textConfirm = 'Are you sure to delete this task?';

class Students extends Component {

	state = {
		students: [],
		selectedStudent: {},
		isFetching: false,
		isAddStuudentModalVisibility: false,
		isEditStudentModalVisibil: false,
		offset: 0,
		limit: 5,
		count: 0
	}
	componentDidMount () {
		//this.fetchStudents();
		this.fetchOffsetStudents();
		this.countStudent();
	}

	openAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: true})
	openEditStudentModal = () => this.setState({isEditStudentModalVisibil: true})

	closeAddStuudentModal = () => this.setState({isAddStuudentModalVisibility: false})
	closeEditStudentModal = () => this.setState({isEditStudentModalVisibil: false})

	onChange = page => {
		console.log(page);
		this.setState({
		  current: page,
		});
	  };
	nextPage = () => {	
		this.setState({offset: this.state.offset + this.state.limit}, () => this.fetchOffsetStudents())	
	}
	
	previousPage = () => {
		this.setState({offset: this.state.offset - this.state.limit}, () => this.fetchOffsetStudents())	
	}

	
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
	updateStudentFormSubmitter  = student => {
		updateStudent(student.studentId, student).then(() => {
			this.closeEditStudentModal();
			this.fetchStudents();
			successNotification(`${student.firstName} was edited`);
		}).catch(error => {
			const message = error.error.message;
			const description = error.error.error;
			errorNotification(message, description);
		})
	}
	fetchStudents = () => {
		this.setState({
			isFetching: true
		});
		getAllStudents()
		.then(res => res.json()
		.then(students => {
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
	fetchOffsetStudents = () => {
		this.setState({
			isFetching: true
		});
		const { offset, limit } = this.state;
		getOffsetStudents(offset, limit)
			.then(res => res.json())
			.then(students => {
				this.setState({students, isFetching: false})
			}).catch(err => {
				console.log(err);
			})
			this.countStudent();
	}

	countStudent = () => {
		getCountStudents()
			.then(res => res.json())
			.then(count => this.setState({count}))	
	}
	
	
	render() {

		
		const {students, isFetching, isAddStuudentModalVisibility, isEditStudentModalVisibil, offset} = this.state;
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
								
					</Modal>
				<Footer numberOfStudents={this.state.count}
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
					cancelText={true}
					okText={true}>

						<EditStudentForm 
							initialValues= {this.state.selectedStudent}
							submitter={this.updateStudentFormSubmitter}></EditStudentForm>

					
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
					key: 'edit',
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
					<PagePagination
						nextPage={() => this.nextPage()}
						numberOfStudents={this.state.count}
						previousPage={this.previousPage}
						offset={this.state.offset}/>

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