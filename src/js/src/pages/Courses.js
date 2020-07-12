import React, {Component} from 'react';


class Courses extends Component {

   state = {
      studentId: ''
   }
   componentDidMount () {
      const studentId = this.props.match.params.studentId;
      console.log(studentId);
      this.setState({studentId});
    }

    render() {
       const {studentId} = this.state;
      return (
         <div>
            <h1>{studentId}</h1>
            
         </div>
      );
    }
}
 
export default Courses;