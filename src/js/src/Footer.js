import React from 'react';
import Conteiner from './Conteiner';
import {Button, Avatar} from 'antd';
import './Footer.css';
const Footer = (props) => (
    <div className='footer'>
        <Conteiner>
            {props.numberOfStudents ? 
                <Avatar 
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}} size='large'>{props.numberOfStudents}</Avatar> : null}
            <Button onClick={() => props.handleAddStudentClickEvent()} type='primary'>Add new student +</Button>
        </Conteiner>
    </div>
);

export default Footer;