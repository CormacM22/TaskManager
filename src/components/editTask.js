import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function EditTask() {
    // Extracting task ID from URL parameters
    let { id } = useParams();

    //  variables to manage form input values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    // Navigation 
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:4000/api/task/${id}`)
            .then((response) => {
                // variables with retrieved task details
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDate(response.data.date);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Creating a task object with updated values
        const task = {
            title: title,
            description: description,
            date: date
        }

        // Making a PUT request to update the task on the server
        axios.put(`http://localhost:4000/api/task/${id}`, task)
            .then((res) => {
                // Navigating to the task list page after successful update
                navigate('/readTask');
            })
            .catch((error) => {
                console.log(error);

            });
    }

    // Styling for the container holding the form
    const containerStyle = {
        backgroundColor: '#333',
        padding: '40px',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const formGroupStyle = {
        marginBottom: '20px',
    };

    // Styling for input fields
    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#444',
        color: 'white',
    };

    // Styling for the submit button
    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };


    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '30px', fontSize: '2.5em' }}>Edit Your Task</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle} className="form-group">
                    <label style={{ fontSize: '1.2em', marginBottom: '10px' }}>Edit Task Title:</label>
                    {/* Input field for editing task title */}
                    <input
                        type="text"
                        style={inputStyle}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div style={formGroupStyle} className="form-group">
                    <label style={{ fontSize: '1.2em', marginBottom: '10px' }}>Edit Task Description:</label>
                    {/* Input field for editing task description */}
                    <input
                        type="text"
                        style={inputStyle}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div style={formGroupStyle} className="form-group">
                    <label style={{ fontSize: '1.2em', marginBottom: '10px' }}>Edit Due Date:</label>
                    {/* Input field for editing due date */}
                    <input
                        type="date"
                        style={inputStyle}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    {/* Submit button */}
                    <button type="submit" style={buttonStyle}>
                        Edit Task
                    </button>
                </div>
            </form>
        </div>
    );
}
