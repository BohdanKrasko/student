import React, {Component} from 'react';
import {getAllStudentCourse} from '../client';
import {Table} from 'antd';
import Conteiner from '../Conteiner';


class Courses extends Component {

   state = {
      studentId: '',
      courses: []
   }
   componentDidMount () {
      
      this.fetchStudentCourses();
    }

   fetchStudentCourses = () => {
      const studentId = this.props.match.params.studentId;
      this.setState({studentId});
      getAllStudentCourse(studentId)
         .then(res => res.json())
         .then(course => {
            console.log(course);
            this.setState({courses: course})
         });
   } 
    render() {
      const {courses} = this.state;
      //if(courses && courses.length) {

         const columns = [
            {
               title: 'Course Id',
               dataIndex: 'courseId',
               key: 'courseId'
            },
            {
               title: 'Department',
               dataIndex: 'department',
               key: 'department'
            },
            {
               title: 'Description',
               dataIndex: 'description',
               key: 'description'
            },
            {
               title: 'Grade',
               dataIndex: 'grade',
               key: 'grade'
            },
            {
               title: 'Name',
               dataIndex: 'name',
               key: 'name'
            },
            {
               title: 'Start Date',
               dataIndex: 'startDate',
               key: 'startDate'
            },
            {
               title: 'End Date',
               dataIndex: 'endDate',
               key: 'endDate'
            },
            {
               title: 'Teacher Name',
               dataIndex: 'teacherName',
               key: 'teacherName'
            }
         ]
        
         return (
            <Conteiner>
               <Table 
                  dataSource={courses} 
                  columns={columns}
                  rowKey='courseId'
                  pagination= {false}
                  />
            </Conteiner>
         )
      //}
      
    }
}
 
export default Courses;