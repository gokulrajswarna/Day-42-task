import React from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {Form} from 'semantic-ui-react'
import axios from 'axios';
export default function Signup()
{
    const [newname,setNewname]=useState("");
    const [newemail,setNewemail]=useState("");
    const [newpass,setPass]=useState("") 
    const [confirm,setConfirm]=useState("")
    const navigate = useNavigate();
    function createData()
    {
        if(newpass===confirm)
        { 
            axios.post('https://password-reset-1zj9.onrender.com/createUsers', {"username":newname, "useremail":newemail,"password":newpass }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { data,status } = response;
               
                if (data.success&& status===200) {
                    alert(`${data.data.username} created account successfully!!!`)
                  navigate('/signin'); // Navigate to the next component
                } 
                
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 409) {
                      // Handle 409 Unauthorized error
                      alert('User account already exists');
                    } else if (error.response.status === 500) {
                      // Handle 500 Not Found error
                      alert('Something went wrong internally!!!');
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
        else
        {alert("Retype password again!!!")}
       
    }   
    return(
        <div className="signup-container">
            <div className="home-title"><h2>CREATE ACCOUNT </h2></div>
            <div className="card">
                <div className="card-body">
                <Form className="form-container">
                <Form.Field>
                   <input placeholder='Enter your Name' onChange={(e) => setNewname(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Enter your Email address' onChange={(e) => setNewemail(e.target.value)}/>
                 </Form.Field>
                <Form.Field>
                    <input type="password" placeholder='Enter  your Password' onChange={(e) => setPass(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <input type="password" placeholder='Confirm  your Password' onChange={(e) => setConfirm(e.target.value)}/>
                </Form.Field>
               
                <button type="button" onClick={createData} className="btn btn-primary">Sign Up</button>
               
               
                </Form>
                </div>
            </div>
        </div>
    )
}
