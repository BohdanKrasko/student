import React from 'react';
import Conteiner from './Conteiner';
import {Button, Avatar} from 'antd';
import './Footer.css';
const Footer = (props) => (
	
    <div className='footer'>
        <Conteiner>
            {props.numberOfStudents !== undefined ? 
                <Button type="link">{<Avatar 
                    //onClick={console.log('click')} 
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}} size='large'>{props.numberOfStudents}</Avatar>}</Button> : null}
            <Button onClick={() => props.handleAddStudentClickEvent()} type='primary'>Add new student +</Button>
        </Conteiner>
    </div>
);

export default Footer;