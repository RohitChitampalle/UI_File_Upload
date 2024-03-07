import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [isDataPosted, setIsDataPosted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  // State to store form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    try {
      

      let {
        firstName,
        lastName,
        email,
        password
      } = formData

      e.preventDefault();

      if (firstName === "" && lastName === "" && password === "" && email === "") {
        setIsDataPosted(false);
        setErrorMessage("Something is missing please check ");

      }else{
        //sending data to a server
        let form_Data = new FormData()
        form_Data.append("first_name", firstName)
        form_Data.append("last_name", lastName)
        form_Data.append("email", email)
        form_Data.append("password", password)
        const response = await axios.post(`http://localhost:8013/api/user/set`, form_Data);
        setIsDataPosted(true)
        console.log('Response:', response.data);

        console.log('Form submitted:', formData);
        // console.log('First name', firstName);
      }
     
    } catch (error) {
      console.log("Error =>", error.response.data["Error"])
      setIsDataPosted(false);
      setErrorMessage(error.response.data["Error"]);

   
  };

}

  console.log("formData =>",formData)
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card h-70 w-50">
          <div className="card-body">
            <h5 className="card-title text-center">Register</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="example123@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex justify-content-center align-items-center m-3">
                <button type="submit" className="btn btn-primary">
                  Register 
                </button>

                <button type="submit" className="btn btn-primary m-lg-2" onClick={() => navigate(`/login`)}>
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
    </>
  );
}

export default Register;
