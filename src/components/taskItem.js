import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function TaskItem(props) {
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:4000/api/task/${props.myTask._id}`);
            props.Reload();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // style for text
    const textStyle = {
        color: 'black',
    };

    // Style for blue card headers
    const cardHeaderStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '15px',
        fontSize: '1.2rem', // increased font size
    };

    // Style for card body
    const cardBodyStyle = {
        padding: '20px', 
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <Card>
                <Card.Header style={cardHeaderStyle}>{props.myTask.title}</Card.Header>
                <Card.Body style={cardBodyStyle}>
                    <blockquote className="blockquote mb-0">
                        <h2 style={textStyle}>Task Description</h2>
                        <Card.Text style={textStyle}>{props.myTask.description}</Card.Text>
                        <h2 style={textStyle}>Due</h2>
                        <Card.Text style={textStyle}>{props.myTask.date}</Card.Text>
                    </blockquote>
                </Card.Body>
                <div className="d-flex justify-content-between p-3">
                    <Link to={`/editTask/${props.myTask._id}`} className='btn btn-primary'>
                        Edit
                    </Link>
                    <Button variant='danger' onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default TaskItem;
