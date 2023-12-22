import { useState } from "react";
import axios from "axios";

function CreateTask() {
    // State variables to manage form input values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Logging form input values
        console.log("Title: " + title +
            " Description: " + description +
            " Date: " + date);

        // Creating a task object from form input values
        const task = {
            title: title,
            description: description,
            date: date
        };

        // Making a POST request to add the task to the server
        axios.post('http://localhost:4000/api/task', task)
            .then(response => {
                console.log("Task added successfully:", response.data);
            })
            .catch(error => {
                console.error("Error adding task:", error);
                // Handle errors
            });
    }

    // Styling for the container holding the form
    const containerStyle = {
        backgroundColor: '#333',
        padding: '20px',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    // Styling for the form
    const formStyle = {
        width: '80%',
        maxWidth: '400px',
        margin: '0 auto', // Center the form horizontally
    };

    // Styling for form groups
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
            <div style={formStyle}>
                <h2>Create Your Task</h2>
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label>Task Title:</label>
                        {/* Input field for task title */}
                        <input
                            type="text"
                            style={inputStyle}
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label>Task Description:</label>
                        {/* Input field for task description */}
                        <input
                            type="text"
                            style={inputStyle}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label>Due Date:</label>
                        {/* Input field for due date */}
                        <input
                            type="date"
                            style={inputStyle}
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
                        />
                    </div>
                    <div>
                        {/* Submit button */}
                        <button type="submit" style={buttonStyle}>
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
