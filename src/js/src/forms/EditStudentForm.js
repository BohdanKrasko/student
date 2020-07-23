import React from 'react';
import { Formik, Form} from 'formik';
import {Button} from 'antd';
import FieldInput from '../component/FieldInput';
 
 const EditStudentForm = (props) => (
   <div>
     <h1>Any place in your app!</h1>
     <Formik
       initialValues={props.initialValues}
       validate={values => {
        const errors = {};

        if(!values.firstName) {
          errors.firstName = 'First Name required';
        }
        if(!values.lastName) {
          errors.lastName = 'Last Name required';
        }
        if (!values.email) {
          errors.email = 'Email required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if(!values.gender) {
          errors.gender = 'Gender required';
        } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
          errors.gender = 'Gender must be (MALE, male, FEMALE)';
        }

        return errors;
      }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
             <FieldInput type='text' name='firstName' placeholder='First name. E.g. John' value={props.initialValues.firstName}></FieldInput>
             <FieldInput type='text' name='lastName' placeholder='Last name. E.g. Nelson' value={props.initialValues.lastName}></FieldInput>
             <FieldInput type='email' name='email' placeholder='Email. E.g. example@gmail.com' value={props.initialValues.email}></FieldInput>
             <FieldInput type='text' name='gender'  placeholder='Gender. E.g. MALE or FEMALE' value={props.initialValues.gender}></FieldInput>
     
           <Button type="submit" disabled={isSubmitting} >
             Submit
           </Button>
         </Form>
       )}
     </Formik>
   </div>
 );
 
 export default EditStudentForm;