import React from 'react';
import { Input} from 'antd';
import {ErrorMessage } from 'formik';
import '../css/FieldInput.css'

const FieldInput = (props) => (
    <div className='fieldInput'>
        <Input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value}></Input>
        <ErrorMessage name={props.name} component="div" />
    </div>
)
export default FieldInput;