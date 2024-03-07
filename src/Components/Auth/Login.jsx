import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const [isDataPosted, setIsDataPosted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // State to track form input values
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let { userName, password } = formData
            if (userName === "" && password === "") {
                setIsDataPosted(false);
                setErrorMessage("Something is missing please check ");
            }
            else {
                // http://localhost:8011/api/user/login?username=chitampalle813@gmail.com&password=ramnam
                const response = await axios.get(`http://localhost:8013/api/user/login?username=${userName}&password=${password}`);
                console.log('Response LOGIN :', response);
                localStorage.setItem("token", response.data?.token)
                navigate(`/user/${response.data?.id}`)

            }
            // Add your logic for form submission here
            console.log('Form submitted with data:', formData);
        } catch (error) {
            console.log("Error =>", error)
            setIsDataPosted(false);
            setErrorMessage(error);
        }
    };
    console.log("Form Data => ",formData)

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            {/* Centered Container */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title  text-center">Login</h5>
                    {/* Your form content goes here */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                placeholder="example123@gmail.com"
                                value={formData.userName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group d-flex justify-content-center align-items-center m-3'>
                            <button type="submit" className="btn btn-primary">
                               Login 
                                
                            </button>
                        </div>
                    </form>
                    {/* Display error or success message */}
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {isDataPosted && (
                        <div className="alert alert-success mt-3" role="alert">
                            Data successfully posted!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
