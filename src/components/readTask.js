import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./tasks";


function ReadTask() {
    // variables for data, loading state, and error handling
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/tasks');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to reload data
    const reloadData = () => {
        setLoading(true);
        axios.get('http://localhost:4000/api/tasks')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
                setError("Error reloading data. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Style for the container 
    const containerStyle = {
        backgroundColor: '#333', 
        padding: '20px', 
    };


    return (
        <div style={containerStyle}>
            <h2 style={{ color: 'white' }}>Daily Tasks</h2>
            {/* Display loading message while data is being fetched */}
            {loading && <p style={{ color: 'white' }}>Loading...</p>}
            {/* Display error message if there's an error */}
            {error && <p style={{ color: 'white' }}>{error}</p>}
            {/* Display tasks component if data is loaded successfully */}
            {!loading && !error && <Tasks myTasks={data} ReloadData={reloadData} />}
        </div>
    );
}

export default ReadTask;
