import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Form} from 'semantic-ui-react'
import axios from 'axios';
export  default function Resetpassword()
{
    const [emailId,setEmailId]=useState("");
    const [token,setToken]=useState("");
    const [newPassword,setNewPassword]=useState("")
    const navigate = useNavigate();
    function updatePassword()
    {
       
        axios.post('https://password-reset-1zj9.onrender.com/reset-password', {"useremail":emailId,"resetToken":token,"newPassword":newPassword }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
           
            if (status===200) {
                alert("Password Updated Successfully!!!")
              navigate('/signin'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to update password');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  alert('Invalid email or token!!!');
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
        <div className="reset-container">
            <div className="reset-head">
                <h2 style={{color:'whitesmoke',textAlign:'center'}}>Password Reset</h2>
            </div>
            <div  className="card ">
                
                <div className="card-body reset-card-body">
                <h6>Check Mails in Spam folder also!!!</h6>
                    <Form>
                        <Form.Field>
                        <input placeholder='Enter Email address'onChange={(e) => setEmailId(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                        <input placeholder='Enter Reset Token' onChange={(e) => setToken(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <input placeholder='Enter New Password'onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Field>
                        <div className="btnDiv">
                          
                            <button className="btn btn-success" onClick={updatePassword}> RESET PASSWORD</button>
                                                    
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
} 
