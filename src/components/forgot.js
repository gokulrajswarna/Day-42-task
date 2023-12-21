import React from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Form} from 'semantic-ui-react'
export default function Forgot()
{
    const [emailotp,sendOtp]=useState("")
    const navigate = useNavigate();
    function handleReset()
    {
        axios.post('https://password-reset-1zj9.onrender.com/requestPasswordReset', { "useremail":emailotp}, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
            
            if ( status===200) {
                alert("Random String sent to your respective email address ")
              navigate('/reset'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to send the random string.');
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
    }
    return(
        <div className="forgot-container">
            <div className="home-title"><h2>RESET PASSWORD</h2></div>
            <div className="card forgot">
            <Form className="forgot">
                <Form.Field>
                    <input placeholder='Enter Email address' onChange={(e) => sendOtp(e.target.value)}/>
                 </Form.Field>
                <div className="btnDiv">
                   
                    <button type="button" onClick={handleReset} className="btn btn-primary">Send OTP</button>
                    
               
               </div>
                </Form>
            </div>
        </div>
    )
}
