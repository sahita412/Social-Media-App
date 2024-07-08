import React, { useEffect, useState } from 'react'
import "./Register.css"
import { Avatar ,Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {registerUser} from "../../Actions/User.js"
import toast from 'react-hot-toast'

export const Register = () => {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[avatar, setAvatar] = useState("");

    const dispatch = useDispatch();
    const{loading, error} = useSelector((state) => state.user);

    const handleImageChange = (e) =>{
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name,email,password,avatar));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearErrors"})
        } 
    },[dispatch, error]);

  return (
    <div className='register'>
        <form action="" className="registerForm" onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>Register</Typography>

            <Avatar 
                src={avatar} 
                alt='User' 
                sx={{height:"10vmax", width:"10vmax"}}
            />

            <input 
                type="file" 
                accept='image/*' 
                onChange={handleImageChange}
            />

            <input 
                type="text" 
                placeholder='Name'
                value={name} 
                className='registerInputs'
                required
                onChange={(e)=>setName(e.target.value)}     
            />

            <input 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                className='registerInputs'
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                className='registerInputs'
                onChange={(e)=>{setPassword(e.target.value)}}
            />

            <Link to="/"><Typography>Already a user?</Typography></Link>

            <Button disabled={loading} type="submit">Register</Button>
        </form>
    </div>
  )
}
