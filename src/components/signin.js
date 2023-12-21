import React from "react";
import {useState} from 'react'
import {Form} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function Signin()
{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    const handleLogin = () => {
        axios.post('https://password-reset-1zj9.onrender.com/checkUser', { "useremail":email,"password":password }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            const { data,status } = response;
            
            if (data.success&& status===200) {
                alert("Logged in successfully!!! ")
              navigate('/home'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                  // Handle 401 Unauthorized error
                  alert('Unauthorized access. Please check your credentials.');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  alert('User account doesnt exists, create new account!!!');
                } else {
                  // Handle other errors
                  console.error('Error:', error);
                  alert('An error occurred while making the request.');
                }
              } else {
                // Handle network errors or other issues
                console.error('Error:', error);
                alert('An error occurred while making the request.');
              }
          });
      };
      
    return(
        <div className="home-page-container">
           
            <div className="home-title"><h2>LOGIN </h2></div>
            <div className="card">
                <div className="card-body">
                <Form className="form-container">
                <Form.Field>
                    <input placeholder='Enter Email address' onChange={(e) => setEmail(e.target.value)}/>
                 </Form.Field>
                <Form.Field>
                    <input placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                
                <button type="button" onClick={handleLogin} className="btn btn-primary">Sign In</button>
                
              
                </Form>
                </div>
            </div>
           
        </div>
    )
}
