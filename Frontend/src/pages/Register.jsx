import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate();
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const [formData, setFormData]=useState({
        username:"",
        password:"" , 
        name  : ""
    });

    const [errors, setErrors]=useState({});

    const handelSubmit = async (event) => {
    event.preventDefault();
    
    const configuration = { 
        withCredentials : true   // it is used to send cookies with the request
     };
    try{
         const res = await axios.post(`${serverEndpoint}/auth/register`, formData , configuration);
         if(res.data.success){
            setErrors({});
            setFormData({
                username:"",
                password:"" , 
                name  : ""
            });
            alert("user registered successfully");
            navigate('/login');
         }
    }catch(err){
        setErrors({message : "something went wrong , please try again"});
    }   
   
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };
  return (
   <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: 400 }}>
        <h1 className="mb-4 text-center">Register</h1>
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
        <form onSubmit={handelSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="d-grid mb-3">
            <button type='submit' className="btn btn-success">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
