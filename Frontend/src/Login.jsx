import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider , GoogleLogin} from '@react-oauth/google'
import { serverEndpoint } from '../src/config'; 
import { useDispatch } from 'react-redux';
function Login() {
    const [formData, setFormData]=useState({
        username:"",
        password:""
    });

    const dispatch = useDispatch();
    const [errors, setErrors]=useState({});

    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setFormData({
            ...formData,
            [name]:value
        });
    };
    const validate=()=>{
        let newErrors={};
        let isValid=true;
        if(formData.username.length===0){
            newErrors.username="Username is Mandatory";
            isValid=false;
            
        }
        if(formData.password.length===0){
            newErrors.password="Password is Mandatory";
            isValid=false;

        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit= async (event)=>{
        event.preventDefault(); 
        if(validate()){
            const configuration = { 
                withCredentials : true
             };
            try{    
                 const response= await axios.post(`${serverEndpoint}/auth/login`,formData , configuration);
                dispatch({
                    type: "SET_USER",
                    payload: response.data.userDetails,
                  });
            }catch(err){
                if(err?.response?.status === 401){
                    setErrors({message  : 'Invalid credentials'});
                }else{
                    setErrors({message : "something went wrong , please try again"});
                }
            }
        }
    };

    const handelGoogleSigin = async (authResponse) => {
        try {   
            const response = await axios.post(`${serverEndpoint}/auth/google-auth`, {
                idToken : authResponse.credential
            } , { withCredentials : true});
            dispatch({
                type: "SET_USER",
                payload: response.data.userDetails,
              });
        } catch (error) {
            console.log(error);
            setErrors({message : "something went wrong , please try again"});
        }
    };

    const handleGoogleSigninFailure = async (error)=> {
        console.log(error);
        setErrors({ message: 'Something went wrong while google signin'});
     };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: 400 }}>
        <h1 className="mb-4 text-center">Login</h1>
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
            {errors.username && <div className="text-danger small">{errors.username}</div>}
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>
          <div className="d-grid mb-3">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
        <div className="text-center my-3">
          <span className="text-muted">OR</span>
        </div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div className="d-flex justify-content-center">
            <GoogleLogin onSuccess={handelGoogleSigin} onError={handleGoogleSigninFailure} />
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default Login;